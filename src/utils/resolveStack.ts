export interface Stack {
  at: string,
  scope: string;
  filename: string;
  lineno: string,
  colno: string
}

/** 匹配栈数据 */
function matchStack(at: string) {
  /** 报错在函数作用域中, 如 HTMLButtonElement.onclick (http://127.0.0.1:5500/public/index.html:11:75) */
  const regFunc = /(.+)\s+\((.+):(\d+):(\d+)\)/;
  /** 报错在全局作用域中, 如 http://127.0.0.1:5500/public/index.html:11:75*/
  const regGlobal = /(.+):(\d+):(\d+)/;

  const regFuncResult = at.match(regFunc);
  if (Array.isArray(regFuncResult)) {
    const [, scope, filename, lineno, colno] = regFuncResult;
    return {
      scope,
      filename,
      lineno,
      colno
    }
  } else {
    const regGlobalResult = at.match(regGlobal) || [];
    const [, filename, lineno, colno] = regGlobalResult;
    return {
      scope: 'global',
      filename,
      lineno,
      colno
    }
  }
}

function resolveStack(stack: string) {
  const ats = stack.split('\n').slice(1).map(at => at.replace(/^\s+at\s+/g, ''));
  const lines = ats.map(at => {
    const line = matchStack(at);
    return {
      at,
      ...line
    };
  });
  return lines;
}

export {
  resolveStack
}