/**
 * @author Ruimve 
 * @description 监听 fetch 请求
 */

import { SpotType, SpotOption } from '../../../define';
import { StabilityType, FetchSpot } from '../define';

type FetchParameters = Parameters<typeof window.fetch>;

const isWhiteListMatched = (url: string, whiteList: string[]) => {
  return whiteList.some(white => {
    const reg = new RegExp(white);
    return reg.test(url);
  })
}

const isStatusMatched = (status: number, statusList: number[]) => {
  return statusList.includes(status);
}

function injectFetchTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === StabilityType.FETCH);
  if (!idx) return;

  const whiteList = idx?.apiWhiteList || [];
  const statusList = idx?.statusList || [];

  const originalFetch = window.fetch;

  window.fetch = function (...args: FetchParameters) {
    const startTime = Date.now();
    return originalFetch.apply(this, args).then(res => {
      if (isWhiteListMatched(res.url, whiteList)) return res;
      if (!isStatusMatched(res.status, statusList)) return res;

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