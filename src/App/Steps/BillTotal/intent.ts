import { DOMSource } from '@cycle/dom';
import { commonIntent } from '@/App/Steps/Common/Intent';

export default (DOM: DOMSource) => commonIntent(DOM, '.bill-total');
