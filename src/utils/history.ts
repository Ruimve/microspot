/**
 * history 路由监听
 */
type Listener = () => void;
type Method = 'back' | 'forward' | 'go' | 'pushState' | 'replaceState';

class HistoryListener {
  events: Set<Listener> = new Set();

  constructor() {
    const methods: Method[] = [/* 'back', 'forward', 'go', */ 'pushState', 'replaceState'];
    methods.forEach((name) => {
      this.registListener(name);
    });
  }

  emit() {
    this.events.forEach((listener: Listener) => listener());
  }

  registListener(name: Method) {
    const originalMethod = history[name];
    const _this = this;

    history[name] = function (...args: any[]) {
      //@ts-ignore
      originalMethod.apply(history, args);
      _this.emit();
    }
  }

  addEventListener(listener: Listener) {
    this.events.add(listener);
    window.addEventListener('popstate', listener, false);
  }

  removeEventListener(listener: Listener) {
    if (this.events.has(listener)) {
      this.events.delete(listener);
      window.removeEventListener('popstate', listener);
    }
  }
}

export const _history = (() => {
  let history: HistoryListener;
  return () => history = history ? history : new HistoryListener
})()();