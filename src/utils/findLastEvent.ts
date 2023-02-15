
interface LastEventInterface {
  /** 最后触发事件 */
  lastEvent: Event | null;
  /** 是否进行初始化 */
  isInitialization: boolean;
  /** 初始化函数 */
  init(): void;
  /** 获取最后触发事件的函数 */
  findLastEvent(): void;
}

class LastEvent implements LastEventInterface {

  lastEvent: Event | null;

  isInitialization: boolean;

  constructor() {
    this.lastEvent = null;
    this.isInitialization = false;
  }

  init(): void {
    this.isInitialization = true;
    [
      'click',
      'touchcancel', 'touchend', 'touchmove', 'touchstart',
      'keydown', 'keypress', 'keyup',
      'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup'
    ].forEach(eventType => {
      window.addEventListener(eventType, event => {
        this.lastEvent = event;
      }, {
        capture: true,
        passive: true
      });
    });
  }

  findLastEvent(): Event | null {
    if (!this.isInitialization) {
      console.warn('无法获取 selector，可能是由于配置 lastEvent 为 false');
    }
    return this.lastEvent;
  }
}

/** 返回一个获取最后事件的函数 */
const lastEvent = new LastEvent();

export {
  lastEvent
}