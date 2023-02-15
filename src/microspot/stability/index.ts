import { DefaultIndex, Send } from '../../config/define';
import { StabilityType } from './define';
import {
  injectErrorTracker,
  injectPromiseTracker,
  injectBlankScreenTracker,
  injectXHRTracker,
  injectFetchTracker
} from './tracker';

interface Props {
  index: DefaultIndex;
  send: Send;
}

/** 注入稳定性追踪器 */
function injectStabilityTracker(props: Props) {
  /** 注入 Error 追踪器 */
  injectErrorTracker.call(null, props);

  /** 注入 Promise 追踪器 */
  injectPromiseTracker.call(null, props);

  /** 注入白屏追踪器 */
  injectBlankScreenTracker.call(null, props);

  /** 注入 xhr 追踪器  */
  injectXHRTracker.call(null, props);

  /** 注入 fetch 追踪器 */
  injectFetchTracker.call(null, props);
}

export {
  injectStabilityTracker
}