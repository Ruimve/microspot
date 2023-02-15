import { DefaultIndex, Send } from '../../config/define';
import { injectCoreTracker, injectCommonTracker } from './tracker';

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectExperienceTracker(props: Props) {

  /** 核心性能指标 */
  injectCoreTracker.call(null, props);

  /** 其他一些指标 */
  injectCommonTracker.call(null, props);

}

export {
  injectExperienceTracker
}