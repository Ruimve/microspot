import { DefaultTracker, Send } from '../config/define';
import { SpotType } from '../define';

import { injectStabilityTracker } from './stability';
import { injectExperienceTracker } from './experience';
import { injectBusinessTracker } from './business';

interface Props {
  tracker: DefaultTracker;
  send: Send;
}

function injectTracker(props: Props) {
  const { tracker, send } = props;

  const stabilityTracker = tracker.find(tk => tk.type === SpotType.STABILITY);
  const experienceTracker = tracker.find(tk => tk.type === SpotType.EXPERIENCE);
  const businessTracker = tracker.find(tk => tk.type === SpotType.BUSINESS);

  /** 稳定性监控 */
  stabilityTracker && injectStabilityTracker({ index: stabilityTracker.index, send });
  /** 体验监控 */
  experienceTracker && injectExperienceTracker({ index: experienceTracker.index, send });
  /** 业务监控 */
  businessTracker && injectBusinessTracker({ index: businessTracker.index, send });
}

export {
  injectTracker
}