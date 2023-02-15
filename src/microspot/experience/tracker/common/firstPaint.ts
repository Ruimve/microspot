/**
 * @description FP (First Paint) 首次绘制时间
 */

import { SpotType, SpotOption } from '../../../../define';
import { ExperienceType, FirstPaintSpot } from '../../define';

function injectFPTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === ExperienceType.FIRST_PAINT);
  if (!idx) return;

  const observer = new PerformanceObserver((entries, observer) => {
    const firstPaint = entries.getEntriesByName('first-paint');
    const startTime = firstPaint[0].startTime;
    const duration = firstPaint[0].duration;

    const spot: FirstPaintSpot = {
      type: SpotType.EXPERIENCE,
      subType: ExperienceType.FIRST_PAINT,
      startTime: `${startTime}`,
      duration: `${duration}`,
    }

    send(spot, idx);

    observer.disconnect();
  });

  observer.observe({ entryTypes: ['paint'] });
}

export {
  injectFPTracker
}