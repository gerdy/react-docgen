import glob from 'fast-glob';
import debugFactory from 'debug';
import { builtinHandlers, parse } from 'react-docgen';
import { readFile } from 'fs/promises';
import loadOptions from './commands/parse/options/loadOptions.js';
import outputError from './commands/parse/output/outputError.js';
import { resolve } from 'path';
import slash from 'slash';
import type { Documentation } from 'react-docgen';

const debug = debugFactory('react-docgen:cli');

const defaultIgnoreGlobs = [
  '**/node_modules/**',
  '**/__tests__/**',
  '**/__mocks__/**',
];

const defaultHandlers = Object.keys(builtinHandlers);
const defaultResolvers = ['find-exported-component'];


interface CLIOptions {
  defaultIgnores: boolean;
  failOnWarning: boolean;
  handler?: string[];
  ignore: string[];
  importer?: string;
  out?: string;
  pretty: boolean;
  resolver?: string[];
}

export default async function (globs: string[], input: CLIOptions) {
    const {
      defaultIgnores,
      failOnWarning,
      handler = defaultHandlers,
      ignore,
      importer = 'fsImporter',
      resolver = defaultResolvers,
    } = (input || {});

    let finalIgnores = ignore;

    // Push the default ignores unless the --no-default-ignore is set
    if (defaultIgnores === true && ignore !== defaultIgnoreGlobs) {
      finalIgnores.push(...defaultIgnoreGlobs);
    } else if (defaultIgnores === false && ignore === defaultIgnoreGlobs) {
      finalIgnores = [];
    }

    const options = await loadOptions({
      handler,
      importer,
      resolver,
    });
    // we use slash to convert windows backslashes to unix format so fast-glob works
    const files = await glob(globs.map(slash), {
      ignore: finalIgnores?.map((ignorePath) => {
        ignorePath = ignorePath.trim();
        // If the ignore glob starts with a dot we need to resolve the path to an
        // absolute path in order for it to work
        if (ignorePath.startsWith('.')) {
          ignorePath = resolve(process.cwd(), ignorePath);
        }

        // we use slash to convert windows backslashes to unix format so fast-glob works
        return slash(ignorePath);
      }),
    });
    const result: Record<string, Documentation[]> = {};
    let errorEncountered = false;

    await Promise.all(
      files.map(async (path) => {
        debug(`Reading file ${path}`);
        const content = await readFile(path, 'utf-8');

        try {
          result[path] = parse(content, {
            filename: path,
            handlers: options.handlers,
            importer: options.importer,
            resolver: options.resolver,
          });
        } catch (error) {
          const isError = outputError(error as Error, path, { failOnWarning });

          if (isError) {
            errorEncountered = true;
          }
        }
      }),
    );
  if (!errorEncountered) {
    return {
      success: true,
      data: result
    }
  }
  return {
    success: false,
    message: '生成异常'
  }
};
