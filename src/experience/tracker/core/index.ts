import { injectLCPTracker } from './largestContentfulPaint';
import { injectFIDTracker } from './firstInputDelay';
import { injectCLSTracker } from './cumulativeLayoutShift';

/**
 * 核心性能指标追踪器 (LCP, FID, CLS)
 */
function injectCoreTracker() {
  injectLCPTracker();
  injectFIDTracker();
  injectCLSTracker();
}

export {
  injectCoreTracker
}