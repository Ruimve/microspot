import { Spot } from '../../define';

export enum BusinessType {
  PAGE_VIEW = 'PAGE_VIEW',
  LOG = 'LOG'
}

export interface BusinessSpot extends Spot {
  subType: BusinessType;
}

/** PV 上报结构体 */
export interface PageViewSpot extends BusinessSpot {
  href: string;
}

export interface LogSpot extends BusinessSpot {
  [keyword: string]: any;
}