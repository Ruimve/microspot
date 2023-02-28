/**
 * @author robot12580 
 * @description 监听 Ajax 请求
 */

import { SpotType, SpotOption } from '../../../define';
import { StabilityType, XHRSpot } from '../define';

/** 获取 open 的参数类型 */
type OpenParameters = Parameters<typeof XMLHttpRequest.prototype.open>;
type OpenParametersOverload = OpenParameters | [method: string, url: string | URL];

/** 获取 send 的参数类型 */
type SendParameters = Parameters<typeof XMLHttpRequest.prototype.send>;

const isWhiteListMatched = (url: string, whiteList: string[]) => {
  return whiteList.some(white => {
    const reg = new RegExp(white);
    return reg.test(url);
  })
}

const isStatusMatched = (status: number, statusList: number[]) => {
  return statusList.includes(status);
}

function injectXHRTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === StabilityType.XHR);
  if (!idx) return;

  const XMLHttpRequest = window.XMLHttpRequest;
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;

  const whiteList = idx?.apiWhiteList || [];
  const statusList = idx?.statusList || [];

  XMLHttpRequest.prototype.open = function (...args: OpenParametersOverload) {
    const [method, url, async] = args;
    if (typeof url === 'string') {
      this.spotData = { method, url, async };
    }
    //@ts-ignore
    return originalOpen.apply(this, args)
  }

  XMLHttpRequest.prototype.send = function (...args: SendParameters) {
    const [body] = args;
    if (this.spotData) {
      const startTime = Date.now(); //在发送之前记录下开始的时间
      const hander = (type: 'load' | 'error' | 'abort') => (event: XMLHttpRequest) => {
        if (isWhiteListMatched(this.spotData.url, whiteList)) return;
        if (!isStatusMatched(this.status, statusList)) return;

        const duration = Date.now() - startTime;
        const status = this.status;
        const statusText = this.statusText;

        const spot: XHRSpot = {
          type: SpotType.STABILITY,
          subType: StabilityType.XHR,
          eventType: type,
          pathname: this.spotData.url,
          status: `${status}`,
          statusText: statusText,
          duration: `${duration}`,
          response: this.response ? JSON.stringify(this.response) : '',
          params: body || ''
        };

        send(spot, idx);
      }

      this.addEventListener('load', hander('load'), false);
      this.addEventListener('error', hander('error'), false);
      this.addEventListener('abort', hander('abort'), false);
    }

    //@ts-ignore
    return originalSend.apply(this, args);
  }
}

export {
  injectXHRTracker
}