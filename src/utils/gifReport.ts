/**
 * 使用 1 * 1 像素的 gif 实现埋点上传
 */

type Init = Record<string, any>;

function querystring(params: Init) {
  if (!params) return '';
  const qs = Object.keys(params).reduce<string>(
    (prv, cur) => prv
      ? `${prv}&${cur}=${encodeURIComponent(JSON.stringify(params[cur]))}`
      : `${cur}=${encodeURIComponent(JSON.stringify(params[cur]))}`
    , '');
  return qs;
}

/**
 * 
 * @param input http://localhost:3000/dig
 * @param option 
 */
function gifReport(input: string | URL, init: Init) {
  const qs = querystring(init);
  const image = new Image();
  if (typeof input === 'string') {
    image.src = `${input}?${qs}`;
  } else {
    image.src = `${input.href}?${qs}`;
  }
}

/**
 * @description 优化上传时机
 * @param callback 回调函数
 * @returns 
 */
function gifReportHOC(callback: typeof gifReport) {
  return (input: string | URL, init: Init) => {
    requestIdleCallback(() => callback(input, init))
  }
}

const HOC = gifReportHOC(gifReport);

export {
  HOC as gifReport
}