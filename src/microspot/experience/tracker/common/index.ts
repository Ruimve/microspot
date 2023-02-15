import { SpotOption } from '../../../../define';

import { injectFPTracker } from './firstPaint';
import { injectFCPTracker } from './firstContentfulPaint';
import { injectLTTracker } from './longTask'

function injectCommonTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  /** FP */
  injectFPTracker.call(null, props);

  /** FCP */
  injectFCPTracker.call(null, props);

  /** 长任务*/
  injectLTTracker.call(null, props);
}

export {
  injectCommonTracker
}