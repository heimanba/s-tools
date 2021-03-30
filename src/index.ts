import { HLogger, ILogger } from '@serverless-devs/core';

/**
 * 初始化项目
 */
export default class SFunctionInit {
  name: string;
  type: string;
  framework: string;

  /**
   *
   * @param type 初始化组件类型
   * @param name 初始化组件名称，默认为 'my-devs-app'
   * @param framework 前端初始化的框架。比如hexo, gatsby等默认有自己标准的源文件和build文件路径
   */
  constructor(type: string, name?: string, framework?: string) {
    this.name = name || 'my-devs-app';
    this.type = type;
    this.framework = framework;
  }

  @HLogger('S_FUNCTIONS') logger: ILogger;
  /**
   * 初始化 midway hooks react项目
   */
  async initialMidwayHooksReact() {}
  /**
   * 初始化 midway hooks vue项目
   */
  async initialMidwayHooksVue() {}
  /**
   * 初始化 midway faas 函数部分
   */
  async initialMidwayFassFunction() {}
}
