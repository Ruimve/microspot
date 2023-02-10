import { injectCoreTracker, injectCommonTracker } from './tracker';

function injectExperienceTracker() {
  /** 核心性能指标 */
  injectCoreTracker();

  /** 其他一些指标 */
  injectCommonTracker();
}

export {
  injectExperienceTracker
}