
import { SpotType } from '../define';
import { StabilityType, RuntimeErrorSpot, ResourceLoadErrorSpot, PromiseRejectionSpot, BlankScreenSpot, XHRSpot, FetchSpot } from '../microspot/stability/define';
import { ExperienceType, FirstPaintSpot, FirstContentfulPaintSpot, LargestContentfulPaintSpot, FirstInputDelaySpot, CumulativeLayoutShiftSpot, LongTaskSpot, TimingSpot } from '../microspot/experience/define';
import { BusinessType, PageViewSpot } from '../microspot/business/define';

/** 上报函数定义 */
type StabilitySpot = RuntimeErrorSpot | ResourceLoadErrorSpot | PromiseRejectionSpot | BlankScreenSpot | XHRSpot | FetchSpot;
type ExperienceSpot = FirstPaintSpot | FirstContentfulPaintSpot | LargestContentfulPaintSpot | FirstInputDelaySpot | CumulativeLayoutShiftSpot | LongTaskSpot | TimingSpot;
type BusinessSpot = PageViewSpot;
export type SendSpot = StabilitySpot | ExperienceSpot | BusinessSpot;
export type Send = (spot: SendSpot | SendSpot[], options: DefaultIndexOption) => void;

/** 配置 config 定义 */
export type IndexType = string | StabilityType | ExperienceType;
export type IndexOption = {
  type: IndexType,
  /** 采样率 0 - 1 */
  sampling: number,
  /** 路由模式 */
  routerMode?: 'history' | 'hash',
  /** 缓冲发送 */
  buffer?: number
}
export type Index = (IndexType | IndexOption)[]

export type TrackerOption = { type: string | SpotType, index?: Index }
export type Tracker = (string | TrackerOption)[];

export interface Config {
  tracker: Tracker;
  lastEvent?: boolean;
  send?: Send;
}

/** 默认配置的定义 */
export type DefaultIndexType = StabilityType | ExperienceType | BusinessType;
export type DefaultIndexOption = {
  type: DefaultIndexType,
  /** 采样率 0 - 1 */
  sampling: number,
  /** 路由模式 */
  routerMode?: 'history' | 'hash',
  /** 缓冲发送 */
  buffer?: number
}
export type DefaultIndex = DefaultIndexOption[];

export type DefaultTrackerOption = { type: SpotType, index: DefaultIndex }
export type DefaultTracker = DefaultTrackerOption[];

export interface DefaultConfig {
  tracker: DefaultTracker;
  lastEvent: boolean;
  send: Send;
}