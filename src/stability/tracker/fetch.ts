/**
 * @author robot12580 
 * @description 监听 fetch 请求
 */

import { SpotType } from '../../define';
import { StabilityType, FetchSpot } from '../define';

type FetchParameters = Parameters<typeof window.fetch>;

function injectFetchTracker() {
  const originalFetch = window.fetch;

  window.fetch = function (...args: FetchParameters) {
    const startTime = Date.now();
    return originalFetch.apply(this, args).then(res => {
      const contentType = res.headers.get('Content-Type');

      const typeMatched = contentType?.match(/^application\/(.+);.*/);
      const type = typeMatched?.[1];

      const duration = Date.now() - startTime;
      const spot: FetchSpot = {
        type: SpotType.STABILITY,
        subType: StabilityType.FETCH,
        pathname: res.url,
        status: `${res.status}`,
        statusText: res.statusText,
        contentType: type || 'text',
        duration: `${duration}`
      }

      console.log('fetch', spot);

      return res;
    })
  }
}

export {
  injectFetchTracker
}