import { Config, DefaultConfig, Send } from './config/define';
import { config as defaultConfig } from './config/microspot.config';
import { mergeConfig } from './config/utils/merge';

import { lastEvent } from './utils/findLastEvent';
import { sendHOC } from './utils/sendHOC';
import { injectTracker } from './microspot';

type SendParameters = Parameters<Send>;

interface MicrospotIF {
  /** 全部配置信息 */
  _config: Config | null;

  /** 配置选项 */
  set(userConfig: Config): void;

  /** 启动监听 */
  start(callback: (config: Config) => void): void;

  /** 用户手动调用埋点方法 */
  send(...args: SendParameters): void;
}

class Microspot implements MicrospotIF {
  _config: DefaultConfig | null = null;

  constructor() {
    this._config = defaultConfig;
  }

  set(userConfig: Config): void {
    /** 合并配置文件 */
    const config = mergeConfig(userConfig, defaultConfig);
    /** 包装发送函数 */
    config.send = sendHOC(config.send);
    /** 设定全局配置文件 */
    this._config = config;
  }

  start(callback?: (config: DefaultConfig) => void): void {
    if (!this._config) {
      throw new Error('请调用 set 方法设定配置文件');
    }

    const { lastEvent: _lastEvent, tracker: _tracker, send: _send } = this._config;

    _lastEvent && lastEvent.init();

    injectTracker({
      tracker: _tracker,
      send: _send
    });

    callback?.(this._config);
  }

  send(...args: SendParameters): void {
    if (!this._config) {
      throw new Error('请调用 set 方法设定配置文件');
    }

    const { send: _send } = this._config;
    _send(...args);
  }
}

const microspot = new Microspot();

export {
  microspot
}