/**
 * @author robot12580 
 * @description 监听 Promise 未处理事件
 */

import { findSelector } from '../utils/findSelector';
import { lastEvent } from '../utils/findLastEvent';
import { resolveStack, Stack } from '../utils/resolveStack';

interface PromiseError {
  type: string;
  subType: string;
  message: string;
  filename: string;
  position: string;
  stack: Stack[],
  selector: string;
}

function formatPromise(event: PromiseRejectionEvent) {

  const lEvent = lastEvent.findLastEvent();
  const reason = event.reason;

  let message: string = '';
  let filename: string = '';
  let position: string = '';
  let stack: Stack[] = [];

  /** 代码报错抛出错误 */
  if (typeof reason === 'object' && reason.message && reason.stack) {
    message = reason.message;
    stack = resolveStack(reason.stack);
    filename = stack?.[0]?.filename || '';
    position = `${stack?.[0]?.lineno}:${stack?.[0]?.colno}`;
  } else { /** 手动使用 reject 抛出错误 */
    message = reason;
  }

  const spot: PromiseError = {
    type: 'stability',
    subType: 'PROMISE_ERROR',
    message,
    filename,
    position,
    stack,
    selector: lEvent ? findSelector(lEvent?.target as HTMLElement) : ''
  }

  return spot;
}

function injectPromiseTracker() {
  window.addEventListener('unhandledrejection', event => {
    const spot = formatPromise(event);
    console.log('Promise', spot)
  }, true);
}

export {
  injectPromiseTracker
}