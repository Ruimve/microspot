/**
 * 采样率
 */
import { Send } from '../../config/define';

function sampling(send: Send): Send {
  /** 返回发送函数 */
  return (spot, options) => {
    const { sampling } = options;
    const random = Math.random();
    if (random <= sampling) {
      send(spot, options);
    }
  }
}

export {
  sampling
}