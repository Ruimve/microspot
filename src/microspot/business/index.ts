
import { DefaultIndex, Send } from '../../config/define';
import { injectPVTracker } from './tracker/pageView';

interface Props {
  index: DefaultIndex;
  send: Send;
}

function injectBusinessTracker(props: Props) {
  injectPVTracker.call(null, props);
}

export {
  injectBusinessTracker
}