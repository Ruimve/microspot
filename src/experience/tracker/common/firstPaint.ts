/**
 * @description FP (First Paint) 首次绘制时间
 */
import { SpotType } from '../../../define';
import { ExperienceType, FirstPaintSpot } from '../../define';

function injectFPTracker() {
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

    console.log('FP spot', spot);
    observer.disconnect();
  });

  observer.observe({ entryTypes: ['paint'] });
}

export {
  injectFPTracker
}