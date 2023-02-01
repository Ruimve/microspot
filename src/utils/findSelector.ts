/** 生成选择器字符串 */
function generateSelector(path: Array<HTMLElement | Window | Document>) {
  /** 使元素路径从 html 到 目标元素排序 */
  const pathSort = path.reverse();

  /** 过滤掉 window 和 document */
  const pathFilter = pathSort.filter(element => element !== window && element !== document) as Array<HTMLElement>;

  /** 选择器 */
  const selector = pathFilter.reduce<string>((prv, cur) => {
    const nodeName = cur.nodeName.toLowerCase();
    if (cur.id) {
      return `${prv} ${nodeName}#${cur.id}`;
    }

    if (cur.className && typeof cur.className === 'string') {
      return `${prv} ${nodeName}.${cur.id}`;
    }

    return `${prv} ${nodeName}`;
  }, '');

  /** 修剪掉头尾的空白符 */
  return selector.trim();
}

/** 向上记录父元素 */
function findSelector(target: HTMLElement | null) {
  const path = [];
  while (target) {
    path.push(target);
    target = target.parentElement;
  }
  return generateSelector(path);
}

export {
  findSelector
}