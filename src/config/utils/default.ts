import { Index, DefaultIndexOption } from '../define';
import { SpotType } from '../../define';

import { StabilityType } from '../../microspot/stability/define';
import { ExperienceType } from '../../microspot/experience/define';
import { BusinessType } from '../../microspot/business/define';

export const StabilityIndex: Index = [
  { type: StabilityType.JS_RUNTIME_ERROR, sampling: 1 },
  { type: StabilityType.SCRIPT_LOAD_ERROR, sampling: 1 },
  { type: StabilityType.CSS_LOAD_ERROR, sampling: 1 },
  { type: StabilityType.IMAGE_LOAD_ERROR, sampling: 1 },
  { type: StabilityType.AUDIO_LOAD_ERROR, sampling: 1 },
  { type: StabilityType.VIDEO_LOAD_ERROR, sampling: 1 },
  { type: StabilityType.PROMISE_REJECTION, sampling: 1 },
  { type: StabilityType.BLANK_SCREEN, sampling: 1 },
  { type: StabilityType.XHR, sampling: 1 },
  { type: StabilityType.FETCH, sampling: 1 },
]

export const ExperienceIndex: Index = [
  { type: ExperienceType.CUMULATIVE_LAYOUT_SHIFT, sampling: 1 },
  { type: ExperienceType.FIRST_INPUT_DELAY, sampling: 1 },
  { type: ExperienceType.LARGEST_CONTENTFUL_PAINT, sampling: 1 },
  { type: ExperienceType.FIRST_PAINT, sampling: 1 },
  { type: ExperienceType.FIRST_CONTENTFUL_PAINT, sampling: 1 },
  { type: ExperienceType.TIMING, sampling: 1 }
]

export const BusinessIndex: Index = [
  { type: BusinessType.PAGE_VIEW, sampling: 1, routerMode: 'history' },
  { type: BusinessType.UNIQUE_VISITOR, sampling: 1 },
]

export const getIndex = (spotType: string | SpotType) => {
  let index: Index = [];
  switch (spotType) {
    case SpotType.STABILITY:
      index = StabilityIndex;
      break;
    case SpotType.EXPERIENCE:
      index = ExperienceIndex;
      break;
    case SpotType.BUSINESS:
      index = BusinessIndex;
      break;
    default:
      break;
  }
  return index as DefaultIndexOption[];
}