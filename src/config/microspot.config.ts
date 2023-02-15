
/**
 * 默认配置文件
 */
import { DefaultConfig, Send } from './define';
import { getIndex } from './utils/default';
import { SpotType } from '../define';

const config: DefaultConfig = {
  tracker: [
    {
      type: SpotType.STABILITY,
      index: getIndex(SpotType.STABILITY)
    },
    {
      type: SpotType.EXPERIENCE,
      index: getIndex(SpotType.EXPERIENCE)
    },
    {
      type: SpotType.BUSINESS,
      index: getIndex(SpotType.BUSINESS)
    }
  ],
  lastEvent: true,
  send: (spot, option) => {
    console.log('发送 ' + spot.subType, spot, option);
  }
}

export {
  config
}