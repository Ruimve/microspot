import { SpotOption } from '../../../../define';

import { injectFPTracker } from './firstPaint';
import { injectFCPTracker } from './firstContentfulPaint';
import { injectLTTracker } from './longTask';

import { injectTimingTracker } from './timing';

function injectCommonTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  /** FP */
  injectFPTracker.call(null, props);

  /** FCP */
  injectFCPTracker.call(null, props);

  /** 长任务*/
  injectLTTracker.call(null, props);

  /** 各个阶段耗时 */
  injectTimingTracker();
}

export {
  injectCommonTracker
}