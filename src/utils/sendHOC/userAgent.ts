/**
 * 使用者环境信息
 */
import { Send } from '../../config/define';

function userAgent(send: Send): Send {
  /** 返回发送函数 */
  return (spot, options) => {
    const env = {
      title: document.title,
      url: location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    }
    send({ ...spot, env }, options);
  }
}

export {
  userAgent
}