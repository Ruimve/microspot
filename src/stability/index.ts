import {
  injectErrorTracker,
  injectPromiseTracker,
  injectBlankScreenTracker,
  injectXHRTracker,
  injectFetchTracker
} from './tracker';

import { lastEvent } from '../utils/findLastEvent';

function injectStabilityTracker() {
  /** 最后操作事件初始化监听 */
  lastEvent.init();
  /** 注入 Error 追踪器 */
  injectErrorTracker();
  /** 注入 Promise 追踪器 */
  injectPromiseTracker();
  /** 注入白屏追踪器 */
  injectBlankScreenTracker();
  /** 注入 xhr 追踪器  */
  injectXHRTracker();
  /** 注入 fetch 追踪器 */
  injectFetchTracker();
}

export {
  injectStabilityTracker
}