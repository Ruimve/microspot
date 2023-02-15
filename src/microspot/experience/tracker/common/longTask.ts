import { SpotType, SpotOption } from '../../../../define';
import { ExperienceType, LongTaskSpot } from '../../define';

import { lastEvent } from '../../../../utils/findLastEvent';
import { findSelector } from '../../../../utils/findSelector';

function injectLTTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === ExperienceType.LONG_TASK);
  if (!idx) return;

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

      send(spot, idx);
    }
  });

  observer.observe({ entryTypes: ['longtask'] })
}

export {
  injectLTTracker
}