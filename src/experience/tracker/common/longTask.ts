import { SpotType } from '../../../define';
import { ExperienceType, LongTaskSpot } from '../../define';

import { lastEvent } from '../../../utils/findLastEvent';
import { findSelector } from '../../../utils/findSelector';

function injectLTTracker() {
  const observer = new PerformanceObserver((entries) => {
    const longTask = entries.getEntries()[0];
    if (longTask.duration > 200) {
      const lEvent = lastEvent.findLastEvent();
      const startTime = longTask.startTime;
      const duration = longTask.duration;
      const spot: LongTaskSpot = {
        type: SpotType.EXPERIENCE,
        subType: ExperienceType.LONG_TASK,
        startTime: `${startTime}`,
        duration: `${duration}`,
        eventType: lEvent ? lEvent.type : '',
        selector: lEvent ? findSelector(lEvent.target as HTMLElement) : ''
      }

      console.log('LT spot', spot);
    }
  });

  observer.observe({ entryTypes: ['longtask'] })
}

export {
  injectLTTracker
}