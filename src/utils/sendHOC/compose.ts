/**
 * @description 合并函数
 */

const compose = (...fns: Function[]) => fns.reduce((prv, cur) => (...args: any[]) => prv(cur(...args)));

export {
  compose
}