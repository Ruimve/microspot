import { DefaultIndex, Send } from '../../../../config/define';

import { injectLCPTracker } from './largestContentfulPaint';
import { injectFIDTracker } from './firstInputDelay';
import { injectCLSTracker } from './cumulativeLayoutShift';

/**
 * 核心性能指标追踪器 (LCP, FID, CLS)
 */

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectCoreTracker(props: Props) {
  injectLCPTracker.call(null, props);
  injectFIDTracker.call(null, props);
  injectCLSTracker.call(null, props);
}

export {
  injectCoreTracker
}