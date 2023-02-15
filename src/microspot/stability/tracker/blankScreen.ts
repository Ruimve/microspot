/**
 * @author robot12580 
 * @description 监听白屏错误
 */

import { DefaultIndex, Send, DefaultIndexOption } from '../../../config/define';
import { SpotType } from '../../../define';
import { StabilityType, BlankScreenSpot } from '../define';

import { onLoad } from '../../../utils/onLoad';

/** 获取元素的所有选择器 */
function getSelector(element: Element) {
  const selectors: string[] = [];

  /** id 选择器 */
  if (element.id) {
    selectors.push(`#${element.id}`);
  }

  /** 类选择器 */
  if (element.className) {
    selectors.push(`.${element.className.split(' ').filter(Boolean).join('.')}`);
  }

  /** 标签选择器 */
  if (element.nodeName) {
    selectors.push(element.nodeName.toLowerCase());
  }

  return selectors;
}

/** 判断元素为 wrapper 元素 */
function isWrapper(element: Element, wrapper: string[]): boolean {
  /** 如果元素不存在，判断为 wrapper 元素 */
  if (!element) return true;

  /** 如果元素在 wrapper 名单中，则为 wrapper 元素 */
  const selector = getSelector(element);
  if (wrapper.some(w => selector.includes(w))) {
    return true;
  }

  /** 其他情况不是 wrapper 元素 */
  return false;
}

function blankScreen(send: Send, idx: DefaultIndexOption) {
  const wrapper = ['html', 'body', '.div1.div2.div3'];
  let emptyPoints = 0;

  /** 将 window 可视区域平分为 4 个象限， 在边界上取18个点 */
  for (let i = 1; i <= 9; i++) {
    const xElement = document.elementsFromPoint(window.innerWidth / 10 * i, window.innerHeight / 2);
    const yElement = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 10 * i);

    isWrapper(xElement[0], wrapper) && emptyPoints++;
    isWrapper(yElement[0], wrapper) && emptyPoints++;
  }

  /** 如果空点数超过 18，则判定为白屏 */
  if (emptyPoints >= 18) {
    const centerElements = document.elementsFromPoint(
      window.innerWidth / 2, window.innerHeight / 2
    );
    const spot: BlankScreenSpot = {
      type: SpotType.STABILITY,
      subType: StabilityType.BLANK_SCREEN,
      emptyPoints: `${emptyPoints}`,
      screen: `${window.screen.width}:${window.screen.height}`,
      viewPoint: `${window.innerWidth}:${window.innerHeight}`,
      selector: getSelector(centerElements[0])
    };
    send(spot, idx);
  }
}

function blankScreenHOC(send: Send, idx: DefaultIndexOption) {
  return () => {
    blankScreen(send, idx)
  }
}

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectBlankScreenTracker(props: Props) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === StabilityType.BLANK_SCREEN);
  if(!idx) return;
  onLoad(blankScreenHOC(send, idx));
}

export {
  injectBlankScreenTracker
}