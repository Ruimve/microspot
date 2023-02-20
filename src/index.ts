import { Config } from './config/define';
import { config as defaultConfig } from './config/microspot.config';
import { mergeConfig } from './config/utils/merge';

import { lastEvent } from './utils/findLastEvent';
import { injectTracker } from './microspot';

function microspot(userConfig: Config | undefined) {
  const config = mergeConfig(userConfig, defaultConfig);

  /** 注入最后操作事件初始化监听 */
  config.lastEvent && lastEvent.init();

  /** 注入追踪器 */
  injectTracker({
    tracker: config.tracker,
    send: config.send
  });
}

export {
  microspot
}