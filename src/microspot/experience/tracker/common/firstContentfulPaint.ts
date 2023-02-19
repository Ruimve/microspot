/**
 * @description FCP (First Contentful Paint) 首次内容绘制时间 
 */

import { SpotType, SpotOption } from '../../../../define';
import { ExperienceType, FirstContentfulPaintSpot } from '../../define';

function injectFCPTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === ExperienceType.FIRST_CONTENTFUL_PAINT);
  if (!idx) return;

  const observer = new PerformanceObserver((entries, observer) => {
    const firstContentPaint = entries.getEntriesByName('first-contentful-paint')[0];
    const startTime = firstContentPaint.startTime;
    const duration = firstContentPaint.duration;

    const spot: FirstContentfulPaintSpot = {
      type: SpotType.EXPERIENCE,
      subType: ExperienceType.FIRST_CONTENTFUL_PAINT,
      startTime: `${startTime}`,
      duration: `${duration}`,
    }

    send(spot, idx);

    observer.disconnect();
  });

  observer.observe({ entryTypes: ['paint'] });
}

export {
  injectFCPTracker
}