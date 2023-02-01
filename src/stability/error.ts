/**
 * @author robot12580 
 * @description 监听 js 运行时错误和资源加载错误
 */

import { findSelector } from '../utils/findSelector';
import { lastEvent } from '../utils/findLastEvent';
import { resolveStack, Stack } from '../utils/resolveStack';

/** error 类型 */
enum ErrorType {
  /** js 运行时错误 */
  JS_RUNTIME_ERROR = 'JS_RUNTIME_ERROR',

  /** 脚本加载错误 */
  SCRIPT_LOAD_ERROR = 'SCRIPT_LOAD_ERROR',

  /** 样式加载错误 */
  CSS_LOAD_ERROR = 'CSS_LOAD_ERROR',

  /** 图片加载错误 */
  IMAGE_LOAD_ERROR = 'IMAGE_LOAD_ERROR',

  /** 音频加载错误 */
  AUDIO_LOAD_ERROR = 'AUDIO_LOAD_ERROR',

  /** 视频加载错误 */
  VIDEO_LOAD_ERROR = 'VIDEO_LOAD_ERROR',
}

/** 资源加载错误接口 */
interface ResourceLoadError {
  type: string;
  subType: ErrorType;
  filename: string;
  tagName: string;
  selector: string;
}

/** JS 运行时错误接口 */
interface RuntimeError {
  type: string;
  subType: ErrorType;
  filename: string;
  message: string;
  position: string;
  stack: Stack[];
  selector: string;
}

/** 资源类型对应资源加载错误 */
const ResourceErrorMap = {
  SCRIPT: ErrorType.SCRIPT_LOAD_ERROR,
  LINK: ErrorType.CSS_LOAD_ERROR,
  IMG: ErrorType.IMAGE_LOAD_ERROR,
  AUDIO: ErrorType.AUDIO_LOAD_ERROR,
  VIDEO: ErrorType.VIDEO_LOAD_ERROR
}

/** 资源标签 */
type ResourceType = keyof (typeof ResourceErrorMap);
/** 资源元素 */
type ResourceElement = HTMLScriptElement & HTMLLinkElement & HTMLImageElement & HTMLAudioElement & HTMLVideoElement;

/** 生成资源加载错误日志 */
function formatResourceLoadError(event: Event): ResourceLoadError {
  const node = event.target as ResourceElement;
  const nodeName = node.nodeName.toUpperCase() as ResourceType;
  const spot: ResourceLoadError = {
    type: 'stability',
    subType: ResourceErrorMap[nodeName],
    filename: node.src || node.href,
    tagName: nodeName.toLowerCase(),
    selector: event.target ? findSelector(event.target as HTMLElement) : ''
  };
  return spot;
}

/** 生成 JS 运行时错误日志 */
function formatRuntimeError(event: ErrorEvent): RuntimeError {
  const lEvent = lastEvent.findLastEvent();
  const spot: RuntimeError = {
    type: 'stability',
    subType: ErrorType.JS_RUNTIME_ERROR,
    filename: event.filename,
    message: event.message,
    position: `${event.lineno}:${event.colno}`,
    stack: resolveStack(event.error.stack),
    selector: lEvent?.target ? findSelector(lEvent?.target as HTMLElement) : ''
  };

  return spot;
}

/** 注入错误跟踪器的函数 */
function injectErrorTracker() {
  window.addEventListener('error', (event) => {

    /** 获取事件的构造函数 */
    const constructor = event.constructor;

    /** 继承自 Event 为资源加载错误 */
    if (constructor === Event) {
      const spot = formatResourceLoadError(event);
      console.log('资源', spot)
    }

    /** 继承自 ErrorEvent 为运行时错误 */
    if (constructor === ErrorEvent) {
      const spot = formatRuntimeError(event);
      console.log('运行时', spot)
    }

  }, true);
}

export {
  injectErrorTracker
}