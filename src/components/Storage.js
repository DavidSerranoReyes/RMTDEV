import { state } from '../common.js';

let storedJobItems = localStorage.getItem('bookmarkJobItems');
if (storedJobItems) {
  state.bookmarkJobItems = JSON.parse(storedJobItems);
}
