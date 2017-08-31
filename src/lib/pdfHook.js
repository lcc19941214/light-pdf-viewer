import utils from './utils';
import { PDF_HOOK } from './constant';


export default function pdfHook(eventName, props) {
  if (PDF_HOOK.indexOf(eventName) !== -1) {
    if (utils.isFunc(props[eventName])) {
      props[eventName]();
    } else if (props[eventName]) {
      console.error(`Type Error: event hook ${eventName} is supposed to be a function`);
    }
  } else {
    console.warn(`undefined event hook: ${eventName}`);
  }
}
