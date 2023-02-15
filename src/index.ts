import { Config } from './config/define';
import { config as defaultConfig } from './config/microspot.config';
import { mergeConfig } from './config/utils/merge';

import { lastEvent } from './utils/findLastEvent';
import { injectTracker } from './microspot';

function configure(userConfig: Config | undefined) {
  const config = mergeConfig(userConfig, defaultConfig);

  /** 注入最后操作事件初始化监听 */
  config.lastEvent && lastEvent.init();

  /** 注入追踪器 */
  injectTracker({
    tracker: config.tracker,
    send: config.send
  });
}

configure({
  tracker: [
    {
      type: 'STABILITY',
      index: [
        {
          type: 'JS_RUNTIME_ERROR',
          sampling: 0.5
        },
        'SCRIPT_LOAD_ERROR',
        'BLANK_SCREEN',
        'FETCH',
        'PROMISE_REJECTION',
        'XHR'
      ]
    },
    'EXPERIENCE'
  ],
  lastEvent: true
});