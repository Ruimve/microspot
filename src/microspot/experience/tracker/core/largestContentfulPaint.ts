/**
 * @description LCP (Largest Contentful Paint) 最大内容绘制
 * @tips 取代 FMP（First Meaningful Paint)
 */

import { DefaultIndex, Send } from '../../../../config/define';
import { SpotType } from '../../../../define';
import { ExperienceType, LargestContentfulPaintSpot } from '../../define';
import { findSelector } from '../../../../utils/findSelector';

interface LargestContentfulPaint extends PerformanceEntry {
  element: HTMLElement;
  url: string;
}

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectLCPTracker(props: Props) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === ExperienceType.LARGEST_CONTENTFUL_PAINT);
  if(!idx) return;

  const observer = new PerformanceObserver((entries, observer) => {
    const largestContentfulPaint = entries.getEntries()[0] as LargestContentfulPaint;
    const element = largestContentfulPaint.element;
    const startTime = largestContentfulPaint.startTime;
    const url = largestContentfulPaint.url;
    const duration = largestContentfulPaint.duration;

    const spot: LargestContentfulPaintSpot = {
      type: SpotType.EXPERIENCE,
      subType: ExperienceType.LARGEST_CONTENTFUL_PAINT,
      startTime: `${startTime}`,
      duration: `${duration}`,
      selector: element ? findSelector(element) : '',
      url,
    }
    send(spot, idx);
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

export {
  injectLCPTracker
}