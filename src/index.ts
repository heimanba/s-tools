import { HLogger, ILogger } from '@serverless-devs/core';
import boolerplateList from './boilerplate-list';
import _ from 'lodash';
import yaml from 'js-yaml';
import fs from 'fs';
import { spawnSync } from 'child_process';
import config from './s-config';

/**
 * 创建 yaml 文件
 * @param url
 * @param data
 */
const createYaml = async (url: string, data: object) => {
  const yamlStr = yaml.dump(data);
  await fs.writeFileSync(url, yamlStr, 'utf8');
};

/**
 * 修改 package.json 文件
 */
const updateJson = async (url: string, json: object) => {
  const data = await fs.readFileSync(url);
  const person = JSON.parse(data.toString());
  const newData = _.merge({}, person, json);
  const str = JSON.stringify(newData, null, 2);// 因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
  await fs.writeFileSync(url, str);
};


/**
 * 初始化项目
 */
export default class SFunctionInit {
  name: string;
  type: string;
  framework: string;

  /**
   *
   * @param type 初始化组件类型(midway-hooks-react|midway-hooks-vue|functions)
   * @param name 初始化组件名称，默认为 'my-devs-app'
   * @param framework 前端初始化的框架。比如hexo, gatsby等默认有自己标准的源文件和build文件路径
   * 只有type===functions时候，framework才有值。hexo, gasby, vuepress
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
  async initialMidwayHooksReact() {
    return {
      type: 'midway-hooks-react',
      name: this.name,
      ...boolerplateList[this.type],
    };
  }
  /**
   * 初始化 midway hooks vue项目
   */
  async initialMidwayHooksVue() {
    return {
      type: 'midway-hooks-vue',
      name: this.name,
      ...boolerplateList[this.type],
    };
  }
  /**
   * 初始化 midway faas 函数部分
   */
  async initialMidwayFassFunction() {
    return {
      type: 'functions',
      name: this.name,
      framework: this.framework,
      ...boolerplateList[this.type],
    };
  }
  /**
   * 初始化 midway hexo
   */
  async initialMidwayHexo() {
    const res = await spawnSync(
      'mkdir testPackages && cp -rf defaultPackages/hexo testPackages',
      [],
      {
        shell: true,
      },
    );
    if (res.status !== 0) {
      return {
        type: 'hexo',
        name: this.name,
        framework: this.framework,
        ...boolerplateList[this.type],
        result: '出错了',
      };
    }

    // todo 初始化的hexo yml基础配置，后期需要提取出来
    const data = {
      service: {
        name: 'hfs-hexo-demo',
      },
      provider: {
        name: 'aliyun',
        runtime: 'nodejs12',
      },
      aggregation: {
        hexo: {
          functionsPattern: ['*'],
        },
      },
      deployType: {
        type: 'static',
        config: {
          rootDir: config('hexo').outputDir,
        },
      },
      package: {
        include: [config('hexo').outputDir],
      },
    };
    // hexo init 初始化时，似乎没有安装 hexo-cli 的依赖
    await spawnSync(
      'cd testPackages/hexo && npm i hexo-cli',
      [],
      {
        shell: true,
      },
    );
    await createYaml('testPackages/hexo/f.yaml', data); // 创建 y.xml
    await updateJson('testPackages/hexo/package.json', { // 修改 package.json
      'midway-integration': {
        lifecycle: {
          'before:package:cleanup': 'npm run build',
        },
      },
      scripts: {
        deploy: 'midway-bin deploy',
      },
    });

    return {
      type: 'hexo',
      name: this.name,
      framework: this.framework,
      ...boolerplateList[this.type],
    };
  }
}
