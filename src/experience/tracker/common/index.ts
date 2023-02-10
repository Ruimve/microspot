import { injectFPTracker } from './firstPaint';
import { injectFCPTracker } from './firstContentfulPaint';
import { injectLTTracker } from './longTask'

function injectCommonTracker() {
  /** FP */
  injectFPTracker();

  /** FCP */
  injectFCPTracker();

  /** 长任务*/
  injectLTTracker();
}

export {
  injectCommonTracker
}