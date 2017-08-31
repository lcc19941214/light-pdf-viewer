const PREVIEW_BOX_WIDTH = 800;
const INITIAL_SCALE = 1.0;
const MIN_SCALE = 1.0;
const MAX_SCALE = 2.0;
const SCALE_STEP = 0.1;

// pdfjs-dist/lib/web/ui_uitls.js
// scale may get multiplied with CSS_UNIT and scaled into 1.33333
// use FIX_CSS_UNIT to fix this auto scale
const FIX_CSS_UNIT = 1 / (96.0 / 72.0);

const PDF_HOOK = [
  'onBeforeLoad',
  'onLoad',
  'onBeforeRender',
  'onRender',
  'onError'
];

export {
  PREVIEW_BOX_WIDTH,
  INITIAL_SCALE,
  MIN_SCALE,
  MAX_SCALE,
  SCALE_STEP,
  FIX_CSS_UNIT,
  PDF_HOOK
};
