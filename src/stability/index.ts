import { injectErrorTracker } from './error';
import { injectPromiseTracker } from './promise';
import { lastEvent } from '../utils/findLastEvent';

function injectStabilityTracker() {
  /** 最后操作事件初始化监听 */
  lastEvent.init();
  /** 注入 Erro 追踪器 */
  injectErrorTracker();
  /** 注入 Promise 追踪器 */
  injectPromiseTracker();
}

export {
  injectStabilityTracker
}