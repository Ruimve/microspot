import { Spot } from '../../define';

export enum BusinessType {
  PAGE_VIEW = 'PAGE_VIEW',
  UNIQUE_VISITOR = 'UNIQUE_VISITOR'
}

export interface BusinessSpot extends Spot {
  subType: BusinessType;
}

export interface PageViewSpot extends BusinessSpot {
  href: string;
}

export interface UniqueVisitor extends BusinessSpot {

}