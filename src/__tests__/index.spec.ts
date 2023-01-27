import { sum } from '../index';
describe('test sum', () => {
  it('1 + 2 = 3', () => {
    const res = sum(1, 2);
    expect(res).toEqual(3);
  });
});