/**
 * Page View 页面访问量
 */

import { SpotType, SpotOption } from '../../../define';
import { BusinessType, PageViewSpot } from '../define';

import { onLoad } from '../../../utils/onLoad';
import { _history } from '../../../utils/history';

function sendlocationSpot(config: Object, callback: Function) {
  const spot: PageViewSpot = {
    type: SpotType.BUSINESS,
    subType: BusinessType.PAGE_VIEW,
    href: location.href
  }
  callback(spot, config);
}

function injectPVTracker(props: Pick<SpotOption, 'index' | 'send'>) {
  const { index, send } = props;
  const idx = index.find(idx => idx.type === BusinessType.PAGE_VIEW);
  if (!idx) return;

  onLoad(() => sendlocationSpot(idx, send));

  if (idx.routerMode === 'hash') {
    window.addEventListener('hashchange', event => sendlocationSpot(idx, send));
  } else {
    _history.addEventListener(() => sendlocationSpot(idx, send));
  }
}

export {
  injectPVTracker
}