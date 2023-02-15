/**
 * @description FCP (First Contentful Paint) 首次内容绘制时间 
 */

import { DefaultIndex, Send } from '../../../../config/define';
import { SpotType } from '../../../../define';
import { ExperienceType, FirstContentfulPaintSpot } from '../../define';

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectFCPTracker(props: Props) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === ExperienceType.FIRST_CONTENTFUL_PAINT);
  if (!idx) return;

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

    send(spot, idx);

    observer.disconnect();
  });

  observer.observe({ entryTypes: ['paint'] });
}

export {
  injectFCPTracker
}