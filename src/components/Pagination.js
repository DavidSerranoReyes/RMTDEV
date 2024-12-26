import {
  RESULTS_PER_PAGE,
  state,
  paginationEl,
  paginationNumberNextEl,
  paginationNumberBackEl,
  paginationBtnNextEl,
  paginationBtnBackEl,
} from '../common.js';

import renderJobList from './JobList.js';

function renderPaginationButtons() {
  // display back button if we are on page 2 or further
  if (state.currentPage >= 2) {
    paginationBtnBackEl.classList.remove('pagination__button--hidden');
  } else {
    paginationBtnBackEl.classList.add('pagination__button--hidden');
  }

  //display next button if there are more job items on the next page
  if (state.searchJobItems.length - state.currentPage * RESULTS_PER_PAGE <= 0) {
    paginationBtnNextEl.classList.add('pagination__button--hidden');
  } else {
    paginationBtnNextEl.classList.remove('pagination__button--hidden');
  }

  //update page numbers
  paginationNumberNextEl.textContent = state.currentPage + 1;
  paginationNumberBackEl.textContent = state.currentPage - 1;

  //unfocus (blur) buttons
  paginationBtnNextEl.blur();
  paginationBtnBackEl.blur();
}

function selectPageButton(event) {
  //get clicked button element
  let clickButtonEl = event.target.closest('.pagination__button');

  // stop function if null
  if (!clickButtonEl) return;

  //check if intention is next or back
  let isNextPage = clickButtonEl.className.includes('--next');

  // update state
  isNextPage ? state.currentPage++ : state.currentPage--;

  //render pagination buttons
  renderPaginationButtons();

  //render job items for that page
  renderJobList();
}

paginationEl.addEventListener('click', selectPageButton);

export default renderPaginationButtons;
