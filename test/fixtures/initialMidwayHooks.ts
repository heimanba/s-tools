import SFunctionInit from '../../src/index';
import _ from 'lodash';

const frameworkList = ['hexo', 'gasby', 'vuepress'];

export const initMidway = async (type: string, name = 'my-devs-app', framework?: string) => {
  const sFunctionInit = new SFunctionInit(type, name, framework);
  if (!type) throw new Error('类型未传');
  if (type === 'function' && !_.includes(frameworkList, framework)) {
    throw new Error('type 为 function 类型，需要传入 framework ');
  }

  switch (type) {
    case 'functions':
      return await sFunctionInit.initialMidwayFassFunction();
    case 'midway-hooks-vue':
      return await sFunctionInit.initialMidwayHooksVue();
    case 'midway-hooks-react':
      return await sFunctionInit.initialMidwayHooksReact();
    case 'hexo':
      return await sFunctionInit.initialMidwayHexo();
    default:
      return await sFunctionInit.initialMidwayFassFunction();
  }
}
