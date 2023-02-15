import { SpotOption } from '../../define';
import { injectCoreTracker, injectCommonTracker } from './tracker';

function injectExperienceTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  /** 核心性能指标 */
  injectCoreTracker.call(null, props);

  /** 其他一些指标 */
  injectCommonTracker.call(null, props);
}

export {
  injectExperienceTracker
}