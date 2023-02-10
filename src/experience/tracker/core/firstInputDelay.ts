/**
 * @description FID (First Input Delay) 首次输入延迟
 */
import { SpotType } from '../../../define';
import { ExperienceType, FirstInputDelaySpot } from '../../define';

interface FirstInputDelay extends PerformanceEntry {
  cancelable: boolean;
  processingStart: number;
  processingEnd: number;
  startTime: number;
}

/** 首次内容绘制时间 (FCP) */
function injectFIDTracker() {
  const observer = new PerformanceObserver((entries, observer) => {
    const firstInputDelay = entries.getEntries()[0] as FirstInputDelay;
    const cancelable = firstInputDelay.cancelable;
    const processingStart = firstInputDelay.processingStart;
    const processingEnd = firstInputDelay.processingEnd;
    const startTime = firstInputDelay.startTime;
    const duration = firstInputDelay.duration;

    const spot: FirstInputDelaySpot = {
      type: SpotType.EXPERIENCE,
      subType: ExperienceType.FIRST_INPUT_DELAY,
      cancelable: `${cancelable}`,
      processingStart: `${processingStart}`,
      processingEnd: `${processingEnd}`,
      startTime: `${startTime}`,
      duration: `${duration}`,
    }

    console.log('FID spot', spot);

    observer.disconnect();
  });

  observer.observe({ entryTypes: ['first-input'] });
}

export {
  injectFIDTracker
}