/**
 * @description FCP (First Contentful Paint) 首次内容绘制时间 
 */

import { SpotType } from '../../../define';
import { ExperienceType, FirstContentfulPaintSpot } from '../../define';

function injectFCPTracker() {
  const observer = new PerformanceObserver((entries, observer) => {
    const firstContentPaint = entries.getEntriesByName('first-contentful-paint');
    const startTime = firstContentPaint[0].startTime;
    const duration = firstContentPaint[0].duration;

    const spot: FirstContentfulPaintSpot = {
      type: SpotType.EXPERIENCE,
      subType: ExperienceType.FIRST_CONTENTFUL_PAINT,
      startTime: `${startTime}`,
      duration: `${duration}`,
    }

    console.log('FCP spot', spot);

    observer.disconnect();
  });

  observer.observe({ entryTypes: ['paint'] });
}

export {
  injectFCPTracker
}