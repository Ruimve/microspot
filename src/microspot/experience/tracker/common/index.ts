import { DefaultIndex, Send } from '../../../../config/define';

import { injectFPTracker } from './firstPaint';
import { injectFCPTracker } from './firstContentfulPaint';
import { injectLTTracker } from './longTask'

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectCommonTracker(props: Props) {
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