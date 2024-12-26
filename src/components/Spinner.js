import { spinnerSearchEl, spinnerJobDetailsEl } from '../common.js';

function renderSpinner(wichSpinner) {
  let spinnerEl =
    wichSpinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
  spinnerEl.classList.toggle('spinner--visible');
}

export default renderSpinner;
