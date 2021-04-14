import { initMidway } from './fixtures/initialMidwayHooks';

describe('开始测试', () => {

  it('测试function', async () => {
    const res = await initMidway('function', null, 'hexo');
    console.log(res);
    expect(res.type).toEqual('functions');
  });

  it('测试vue', async () => {
    const res = await initMidway('midway-hooks-vue', 'app-name');
    console.log(res);
    expect(res.type).toEqual('midway-hooks-vue');
  });

  it('测试reat', async () => {
    const res = await initMidway('midway-hooks-react');
    console.log(res);
    expect(res.type).toEqual('midway-hooks-react');
  });

  it('测试hexo', async () => {
    const res = await initMidway('hexo');
    console.log(res);
    expect(res.type).toEqual('hexo');
  });
})
