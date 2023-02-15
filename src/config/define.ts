
import { SpotType } from '../define';
import { StabilityType, RuntimeErrorSpot, ResourceLoadErrorSpot, PromiseRejectionSpot, BlankScreenSpot, XHRSpot, FetchSpot } from '../microspot/stability/define';
import { ExperienceType, FirstPaintSpot, FirstContentfulPaintSpot, LargestContentfulPaintSpot, FirstInputDelaySpot, CumulativeLayoutShiftSpot, LongTaskSpot } from '../microspot/experience/define';

/** 配置 config 定义 */
export type IndexType = string | StabilityType | ExperienceType;
export type IndexOption = { type: IndexType, /** 采样率 0 - 1 */ sampling: number }
export type Index = (IndexType | IndexOption)[]

export type TrackerOption = { type: string | SpotType, index?: Index }
export type Tracker = (string | TrackerOption)[];

export interface Config {
  tracker: Tracker;
  lastEvent?: boolean;
  send?: (spot: any) => void;
}

/** 默认配置的定义 */
export type DefaultIndexType = StabilityType | ExperienceType;
export type DefaultIndexOption = { type: DefaultIndexType, /** 采样率 0 - 1 */ sampling: number }
export type DefaultIndex = DefaultIndexOption[];

export type DefaultTrackerOption = { type: SpotType, index: DefaultIndex }
export type DefaultTracker = DefaultTrackerOption[];

type StabilitySpot = RuntimeErrorSpot | ResourceLoadErrorSpot | PromiseRejectionSpot | BlankScreenSpot | XHRSpot | FetchSpot;
type ExperienceSpot = FirstPaintSpot | FirstContentfulPaintSpot | LargestContentfulPaintSpot | FirstInputDelaySpot | CumulativeLayoutShiftSpot | LongTaskSpot;
export type Send = (spot: StabilitySpot | ExperienceSpot, options: DefaultIndexOption) => void;;

export interface DefaultConfig {
  tracker: DefaultTracker;
  lastEvent: boolean;
  send: Send;
}