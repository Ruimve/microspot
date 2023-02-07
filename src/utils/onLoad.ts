function onLoad(callback: Function) {
  /** document 和 资源全部加载完毕 readyState 为 complete，直接执行回调 */
  if (document.readyState === 'complete') {
    callback();
  } else { /** 等全部加载完毕，再执行回调 */
    window.addEventListener('load', (...args) => callback.call(null, ...args));
  }
}

export {
  onLoad
}