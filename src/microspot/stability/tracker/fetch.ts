/**
 * @author robot12580 
 * @description 监听 fetch 请求
 */

import { SpotType, SpotOption } from '../../../define';
import { StabilityType, FetchSpot } from '../define';

type FetchParameters = Parameters<typeof window.fetch>;

function injectFetchTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === StabilityType.FETCH);
  if(!idx) return;

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
      };
      send(spot, idx);
      return res;
    })
  }
}

export {
  injectFetchTracker
}