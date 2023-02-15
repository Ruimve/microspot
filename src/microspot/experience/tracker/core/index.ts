import { SpotOption } from '../../../../define';

import { injectLCPTracker } from './largestContentfulPaint';
import { injectFIDTracker } from './firstInputDelay';
import { injectCLSTracker } from './cumulativeLayoutShift';

/**
 * 核心性能指标追踪器 (LCP, FID, CLS)
 */

function injectCoreTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  injectLCPTracker.call(null, props);
  injectFIDTracker.call(null, props);
  injectCLSTracker.call(null, props);
}

export {
  injectCoreTracker
}