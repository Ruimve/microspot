import { Spot } from "../../define";
import { Stack } from '../../utils/resolveStack';

/** error 类型 */
export enum StabilityType {
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

  /** Promise 拒绝状态未捕获 */
  PROMISE_REJECTION = 'PROMISE_REJECTION',

  /** 白屏 */
  BLANK_SCREEN = 'BLANK_SCREEN',

  /** Ajax */
  XHR = 'XHR',

  /** Fetch */
  FETCH = 'FETCH'
}

export interface StabilitySpot extends Spot {
  subType: StabilityType;
}

/** 运行时错误上报格式 */
export interface RuntimeErrorSpot extends StabilitySpot {
  filename: string;
  message: string;
  position: string;
  stack: Stack[];
  selector: string;
}

/** 资源加载错误上报格式 */
export interface ResourceLoadErrorSpot extends StabilitySpot {
  filename: string;
  tagName: string;
  selector: string;
}

/** 捕获拒绝未处理的 Promise */
export interface PromiseRejectionSpot extends StabilitySpot {
  message: string;
  filename: string;
  position: string;
  stack: Stack[],
  selector: string;
}

/** 白屏上报格式 */
export interface BlankScreenSpot extends StabilitySpot {
  emptyPoints: string;
  screen: string;
  viewPoint: string;
  selector: string[];
}

/** Ajax 请求上报 */
export interface XHRSpot extends StabilitySpot {
  eventType: string;
  pathname: string;
  status: string;
  statusText: string;
  duration: string;
  response: string;
  params: string | Document | Blob | ArrayBufferView | ArrayBuffer | FormData;
}

/** Fetch 请求上报 */
export interface FetchSpot extends StabilitySpot {
  pathname: string;
  status: string;
  statusText: string;
  contentType: string;
  duration: string;
}