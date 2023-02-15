import { DefaultTracker } from './config/define';

/** 指标大类 */
export enum SpotType {
  /** 系统稳定性指标 */
  STABILITY = 'STABILITY',
  /** 用户体验指标  */
  EXPERIENCE = 'EXPERIENCE',
  /** 业务指标 */
  BUSINESS = 'BUSINESS'
}

/** 日志类型 */
export interface Spot {
  type: SpotType;
}