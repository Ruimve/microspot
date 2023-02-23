import { Send } from '../../config/define';
import { compose } from './compose';
import { sampling } from './sampling';
import { buffer } from './buffer';

function sendHOC(send: Send): Send {
  return compose(sampling, buffer)(send);
}

export {
  sendHOC
}