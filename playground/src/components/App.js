import React from 'react';
import Panel from './CodeMirrorPanel.js';
import Header from './Header.js';
import { parse } from '@yqn/docgen';

const codeSampleTSX = `
import React from 'react';
import { Steps as YCMSteps } from '@yqn/ycm';
import type { RulesType, NumberPlateProps } from './number-plate';

enum Status {
    // 等待
    wait = 'wait',
    process = 'process',
    // 完成
    finish = 'finish',
    error = 'error',
}

enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

enum Size {
    small = 'small',
    default = 'default',
}

enum Type {
    // 默认
    default,
    // 导航
    navigation,
}


interface ObjectP {
    key: string | number;
    label: string;
}
type TItem = {
    /**
     * @title 步骤的详情描述，可选
     * @description 步骤的详情描述，可选
    */
    description?: string;
      /**
     * @title 号码
     * @description 这里的属性都是导入的
    */
    numberPlate: NumberPlateProps;
}
interface IItem {
    /**
     * @title 步骤的详情描述，可选
     * @description 步骤的详情描述，可选
    */
    description?: string;

    /**
     * @title 禁用点击Bool
     * @description 禁用点击
     */
    disabledBool?: boolean;

     /**
     * @title 禁用点击Num
     * @description 禁用点击
     */
     disabledNum?: number;

     /**
     * @title 禁用点击Num[]
     * @description 禁用点击
     */
    disabledNumArr?: number[];
     /**
     * @title 禁用点击Num[]
     * @description 禁用点击
     */
    disabledStrArr?: string[];

      /**
     * @title options
     * @description  message相关配置 如 duration
     */
    options?: Record<string, string | number | ObjectP[]>;
    
    /**
     * @title 指定状态
     * @description 当不配置该属性时，会使用 Steps 的 current 来自动指定状态。默认为 wait
    */
    status?: Array<string>;

     /**
     * @title children
     * @description 当不配置该属性时
    */
    children: Partial<ObjectP>[];

    /**
     * @title modalConfig
     * @description 测试对象类型
    */
    modalConfig?: {
        key: string;
        /**
         * @title 标题
         * @description 这是描述
        */
        title: string;
        width: number;
    };


    /**
     * @title typeTest
     * @description 字面量类型
     */
    typeTest: 1 | 2 | 3 | 4;


    /**
     * @title 子标题
     * @description 子标题
    */
    subTitle?: string | number | string[] | ObjectP | ObjectP[];

    /**
     * @title 标题
     * @description 标题
    */
    title: string;

    /**
     * @title 倒入-标题
     * @description 这里是导入的
    */
    importTitle: RulesType;

    /**
     * @title 号码
     * @description 这里的属性都是导入的
    */
    numberPlate: NumberPlateProps;
}

interface IProps {
    item: TItem;
    /**
     * @title 配置选项卡内容
     * @description 配置选项卡内容
    */
    items: IItem;

    /**
     * @title 指定当前步骤
     * @description 从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态
     */
    current?: number;

    /**
     * @title 指定步骤条方向
     * @description 目前支持水平（horizontal）和竖直（vertical）两种方向
     */
    direction?: Direction;

    /**
     * @title 起始序号
     * @description 从 0 开始记数
     */
    initial?: number;
    /**
     * @title 指定标签放置位置
     * @description 默认水平放图标右侧，可选 vertical 放图标下方
     */
    labelPlacement?: Direction;

    /**
     * @title 当前 process 步骤显示的进度条进度
     * @description （只对基本类型的 Steps 生效）
     */
    percent?: number;

    /**
     * @title 当屏幕宽度小于 532px 时自动变为垂直模式
     * @description 默认为true
     */
    responsive?: boolean;

    /**
     * @title 指定大小
     * @description 目前支持普通（default）和迷你（small）
     */
    size?: Size;

    /**
     * @title 指定当前步骤的状态
     * @description 可选 wait process finish error
     */
    status?: Status;

    /**
     * @title 步骤条类型
     * @description 有 default 和 navigation 两种
     */
    type?: Type;

    /**
     * @title 步骤条类型
     * @description 有 default 和 navigation 两种
     */
    onBeforeRequest?: () => void;
}

const TestTsComponent = ({
    items,
    ...props
}: IProps) => {

    const Contents = items.map((props) => (
        <YCMSteps.Step key={props.title} {...props} />
    ));

    return (
        <YCMSteps {...props}>{Contents}</YCMSteps>
    );
};

export default TestTsComponent;
`

const codeSample = `import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * General component description.
 */
class MyComponent extends Component {
  render() {
    // ...
  }
}

MyComponent.propTypes = {
  /**
   * Description of prop "foo".
   */
  foo: PropTypes.number,
  /**
   * Description of prop "bar" (a custom validation function).
   */
  bar: function(props, propName, componentName) {
    // ...
  },
  baz: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
};

MyComponent.defaultProps = {
  foo: 42,
  bar: 21
};

export default MyComponent;
`;

const defaultPlugins = [
  'jsx',
  'asyncGenerators',
  'bigInt',
  'classProperties',
  'classPrivateProperties',
  'classPrivateMethods',
  ['decorators', { decoratorsBeforeExport: false }],
  'doExpressions',
  'dynamicImport',
  'exportDefaultFrom',
  'exportNamespaceFrom',
  'functionBind',
  'functionSent',
  'importMeta',
  'logicalAssignment',
  'nullishCoalescingOperator',
  'numericSeparator',
  'objectRestSpread',
  'optionalCatchBinding',
  'optionalChaining',
  ['pipelineOperator', { proposal: 'minimal' }],
  'throwExpressions',
  'topLevelAwait',
];

export default class App extends React.Component {
  constructor() {
    super();
    this._jsonRef = React.createRef();

    const options = this.buildOptions('ts');

    this.state = {
      value: this.compile(codeSampleTSX, options),
      mode: 'application/json',
      content: codeSampleTSX,
      options,
    };
  }

  compile(value, options) {
    return JSON.stringify(parse(value, options), null, 2);
  }

  handleChange = (value) => {
    let result;
    let mode = 'text/plain';

    try {
      result = this.compile(value, this.state.options);
      mode = 'application/json';
    } catch (err) {
      result = String(err);
    }
    this.setState({ value: result, mode, content: value });
  };

  buildOptions(language) {
    const options = {
      babelOptions: {
        babelrc: false,
        babelrcRoots: false,
        configFile: false,
        filename: 'playground.js',
        parserOpts: {
          plugins: [...defaultPlugins],
        },
      },
    };

    switch (language) {
      case 'ts':
        options.babelOptions.parserOpts.plugins.push('typescript');
        options.babelOptions.filename = 'playground.tsx';
        break;
      case 'flow':
        options.babelOptions.parserOpts.plugins.push('flow');
        break;
    }

    return options;
  }

  handleLanguageChange = (language) => {
    this.setState({ options: this.buildOptions(language) }, () =>
      this.handleChange(this.state.content),
    );
  };

  render() {
    return (
      <>
        <Header onLanguageChange={this.handleLanguageChange} />
        <div className="panels">
          <Panel
            value={this.state.content}
            mode="text/jsx"
            codeSample={codeSampleTSX}
            onChange={this.handleChange}
          />
          <Panel
            readOnly={true}
            ref={this._jsonRef}
            value={this.state.value}
            mode={this.state.mode}
          />
        </div>
      </>
    );
  }
}
