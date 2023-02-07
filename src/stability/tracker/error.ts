/**
 * @author robot12580 
 * @description 监听 js 运行时错误和资源加载错误
 */
import { SpotType } from '../../define';
import { StabilityType, RuntimeErrorSpot, ResourceLoadErrorSpot } from '../define';

import { findSelector } from '../../utils/findSelector';
import { lastEvent } from '../../utils/findLastEvent';
import { resolveStack } from '../../utils/resolveStack';

/** 资源类型对应资源加载错误 */
const ResourceErrorMap = {
  SCRIPT: StabilityType.SCRIPT_LOAD_ERROR,
  LINK: StabilityType.CSS_LOAD_ERROR,
  IMG: StabilityType.IMAGE_LOAD_ERROR,
  AUDIO: StabilityType.AUDIO_LOAD_ERROR,
  VIDEO: StabilityType.VIDEO_LOAD_ERROR
}

/** 资源标签 */
type ResourceType = keyof (typeof ResourceErrorMap);
/** 资源元素 */
type ResourceElement = HTMLScriptElement & HTMLLinkElement & HTMLImageElement & HTMLAudioElement & HTMLVideoElement;

/** 生成资源加载错误日志 */
function formatResourceLoadError(event: Event): ResourceLoadErrorSpot {
  const node = event.target as ResourceElement;
  const nodeName = node.nodeName.toUpperCase() as ResourceType;
  const spot: ResourceLoadErrorSpot = {
    type: SpotType.STABILITY,
    subType: ResourceErrorMap[nodeName],
    filename: node.src || node.href,
    tagName: nodeName.toLowerCase(),
    selector: event.target ? findSelector(event.target as HTMLElement) : ''
  };
  return spot;
}

/** 生成 JS 运行时错误日志 */
function formatRuntimeError(event: ErrorEvent): RuntimeErrorSpot {
  const lEvent = lastEvent.findLastEvent();
  const spot: RuntimeErrorSpot = {
    type: SpotType.STABILITY,
    subType: StabilityType.JS_RUNTIME_ERROR,
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