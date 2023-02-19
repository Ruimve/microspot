import { Spot } from '../../define';

export enum ExperienceType {
  FIRST_PAINT = 'FIRST_PAINT',
  FIRST_CONTENTFUL_PAINT = 'FIRST_CONTENTFUL_PAINT',
  LARGEST_CONTENTFUL_PAINT = 'LARGEST_CONTENTFUL_PAINT',
  FIRST_INPUT_DELAY = 'FIRST_INPUT_DELAY',
  CUMULATIVE_LAYOUT_SHIFT = 'CUMULATIVE_LAYOUT_SHIFT',
  LONG_TASK = 'LONG_TASK',
  TIMING = 'TIMING'
}

export interface ExperienceSpot extends Spot {
  subType: ExperienceType;
}

/** FP 上报 */
export interface FirstPaintSpot extends ExperienceSpot {
  startTime: string;
  duration: string;
}

/** FCP 上报 */
export interface FirstContentfulPaintSpot extends ExperienceSpot {
  startTime: string;
  duration: string;
}

/** LCP 上报 */
export interface LargestContentfulPaintSpot extends ExperienceSpot {
  startTime: string;
  duration: string;
  selector: string;
  url: string;
}

/** FID 上报 */
export interface FirstInputDelaySpot extends ExperienceSpot {
  cancelable: string,
  processingStart: string,
  processingEnd: string,
  startTime: string;
  duration: string;
}

/** CLS 上报 */
export interface CumulativeLayoutShiftSpot extends ExperienceSpot {
  value: string;
  sources: string[];
}

/** LT 上报 */
export interface LongTaskSpot extends ExperienceSpot {
  eventType: string;
  startTime: string;
  duration: string;
  selector: string;
}


/** 页面耗时上报 */
export interface TimingSpot extends ExperienceSpot {
  /** 性能元数据 */
  raw: PerformanceNavigationTiming;
  /** 页面加载总耗时 */
  loadTiming: string;
  /** DNS 解析耗时 */
  dnsTiming: string;
  /** TCP 连接耗时 */
  tcpTiming: string;
  /** SSL 连接耗时 */
  sslTiming: string;
  /** 网路请求耗时 */
  requestTiming: string;
  /** 数据请求耗时 */
  responseTiming: string;
  /** DOM 解析耗时 */
  domTiming: string;
  /** 资源加载耗时 */
  resourceTiming: string;
  /** 首包耗时 */
  firstPacketTiming: string;
  /** 页面渲染耗时 */
  renderTiming: string;
  /** HTML 加载完时间 */
  htmlTiming: string;
  /** 首次可交互时间 */
  firstInteractiveTiming: string;
}