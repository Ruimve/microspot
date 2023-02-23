/**
 * 缓冲发送
 */
import { Send, SendSpot, DefaultIndexType } from '../../config/define';

function buffer(send: Send): Send {
  /** 暂存埋点信息 */
  const bufferMap = new Map<DefaultIndexType, SendSpot[]>();
  /** 返回发送函数 */
  return (spot, options) => {
    const { type, buffer } = options;
    /** 任意配置大于 0 的 buffer，表示开启 */
    if (typeof buffer === 'number' && buffer > 0) {
      /** 如果缓存已存在 */
      if (bufferMap.has(type)) {
        /** 获取缓存值 */
        const bu = bufferMap.get(type) || [];
        /** 如果缓存没满则继续插入 */
        if (bu.length < buffer) {
          bufferMap.set(type, bu.concat(spot));
          /** 如果达到最大值，则上传数据 */
        } else if (bu.length === buffer) {
          send(bu as any, options);
          bufferMap.delete(type);
          /** 如果超出设定值，清空缓存 */
        } else {
          bufferMap.delete(type);
        }
        /** 初始一个缓存 */
      } else {
        bufferMap.set(type, ([] as SendSpot[]).concat(spot))
      }
      /** 不开启缓存 */
    } else {
      send(spot, options);
    }
  }
}

export {
  buffer
}