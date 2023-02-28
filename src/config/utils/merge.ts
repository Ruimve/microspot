/**
 * @description 合并用户配置和默认配置
 */
import {
  Config,
  Index,
  IndexOption,
  Tracker,
  TrackerOption,
  DefaultConfig,
  DefaultIndex,
  DefaultIndexOption,
  DefaultTracker,
  DefaultTrackerOption
} from '../define';

import { getIndex } from '../utils/default';
import { SpotType } from '../../define';
import { types } from '@babel/core';

/** 合并指标 */
function mergeIndex(userIndex: Index | undefined, defaultIndex: DefaultIndex): DefaultIndex {
  /** 如果不传指标，则默认追踪所有指标 */
  if (typeof userIndex === 'undefined') return defaultIndex;

  /** 如果传了，则进行合并 */
  const index = userIndex.map<IndexOption>(idx => {

    /** 如果指标为字符串，则转换为 Index 对象 */
    if (typeof idx === 'string') {
      return {
        type: idx,
        sampling: 1
      }
    }

    /** 返回合并后的 Index 对象 */
    return {
      type: idx.type,
      sampling: typeof idx.sampling === 'number' ? idx.sampling : 1,
      routerMode: idx.routerMode,
      buffer: idx.buffer,
      apiWhiteList: idx.apiWhiteList,
      statusList: idx.statusList
    }
  });

  return index as DefaultIndex;
}

/** 合并追踪器 */
function mergeTracker(userTracker: Tracker | undefined, defaultTracker: DefaultTracker): DefaultTracker {
  /** trakcer 未定义时，默认开启所有 trakcer */
  if (typeof userTracker === 'undefined') return defaultTracker;

  /** 遍历用户 tracker，合并指标 */
  const tracker = userTracker.map<TrackerOption>(tk => {
    if (typeof tk === 'string') {
      const spotType = tk as SpotType;
      return {
        type: spotType,
        index: getIndex(spotType)
      }
    }

    /** 返回合并后的 Tracker 对象 */
    return {
      type: tk.type,
      index: mergeIndex(tk.index, getIndex(tk.type))
    }
  })

  return tracker as DefaultTrackerOption[];
}

/** 合并配置项 */
function mergeConfig(userConfig: Config | undefined, defaultConfig: DefaultConfig): DefaultConfig {
  /** 如果用户配置不存在，则读取默认配置 */
  if (typeof userConfig === 'undefined') return defaultConfig;

  /** 合并用户设置 tracker 和默认 tracker */
  const tracker = mergeTracker(userConfig.tracker, defaultConfig.tracker);

  /** 合并发送函数 */
  const send = userConfig.send ?? defaultConfig.send;

  /** 合并是否监听最后操作事件 */
  const lastEvent = typeof userConfig.lastEvent === 'undefined' ? defaultConfig.lastEvent : userConfig.lastEvent

  /** 返回合并后的配置项 */
  return {
    tracker,
    lastEvent,
    send
  }
}

export {
  mergeConfig
}