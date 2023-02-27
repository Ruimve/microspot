import { Send } from '../../config/define';
import { compose } from './compose';
import { sampling } from './sampling';
import { buffer } from './buffer';
import { userAgent } from './userAgent';

function sendHOC(send: Send): Send {
  return compose(sampling, userAgent, buffer)(send);
}

export {
  sendHOC
}