import { Spot } from '../define';

export enum ExperienceType {
  FIRST_PAINT = 'FIRST_PAINT',
  FIRST_CONTENTFUL_PAINT = 'FIRST_CONTENTFUL_PAINT',
  LARGEST_CONTENTFUL_PAINT = 'LARGEST_CONTENTFUL_PAINT',
  FIRST_INPUT_DELAY = 'FIRST_INPUT_DELAY',
  CUMULATIVE_LAYOUT_SHIFT = 'CUMULATIVE_LAYOUT_SHIFT',
  LONG_TASK = 'LONG_TASK'
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
