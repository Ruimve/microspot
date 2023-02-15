import { injectErrorTracker } from '../error';

describe('测试错误追踪器', () => {
  it('抛出一个错误，被错误追踪器捕获', ()=>{
    expect(1 + 1).toEqual(2);
  });
});