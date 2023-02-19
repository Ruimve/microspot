import { SpotType } from '../../../../define';
import { ExperienceType, TimingSpot } from '../../define';
function injectTimingTracker() {
  const observer = new PerformanceObserver((entries, observer) => {
    console.log('entries', entries.getEntries())
    const navigationTiming = entries.getEntries()[0] as PerformanceNavigationTiming;

    const spot: TimingSpot = {
      type: SpotType.EXPERIENCE,
      subType: ExperienceType.TIMING,
      raw: navigationTiming,
      loadTiming: `${navigationTiming.loadEventEnd - navigationTiming.startTime}`,
      dnsTiming: `${navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart}`,
      tcpTiming: `${navigationTiming.connectEnd - navigationTiming.connectStart}`,
      sslTiming: `${location.protocol === 'https:' ? navigationTiming.connectEnd - navigationTiming.secureConnectionStart : '0'}`,
      requestTiming: `${navigationTiming.responseStart - navigationTiming.requestStart}`,
      responseTiming: `${navigationTiming.responseEnd - navigationTiming.responseStart}`,
      domTiming: `${navigationTiming.domContentLoadedEventEnd - navigationTiming.responseEnd}`,
      resourceTiming: `${navigationTiming.loadEventEnd - navigationTiming.domContentLoadedEventEnd}`,
      firstPacketTiming: `${navigationTiming.responseStart - navigationTiming.startTime}`,
      renderTiming: `${navigationTiming.loadEventEnd - navigationTiming.responseEnd}`,
      htmlTiming: `${navigationTiming.responseEnd - navigationTiming.startTime}`,
      firstInteractiveTiming: `${navigationTiming.domInteractive - navigationTiming.startTime}`,
      
    }

    console.log(spot, 'navigationTiming')
  });

  observer.observe({ entryTypes: ['navigation'] });
}

export {
  injectTimingTracker
}