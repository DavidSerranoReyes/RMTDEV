import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from '../common.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

function selectSorting(event) {
  //get clicked button element
  let clickedButtonEl = event.target.closest('.sorting__button');

  //stop function if no clicked button element
  if (!clickedButtonEl) return;

  //update state (reset to page 1)
  state.currentPage = 1;

  //check if intention is recent or relevant sorting
  let isRecentButton = clickedButtonEl.className.includes('--recent');

  // make sorting button look (in) active
  if (isRecentButton) {
    sortingBtnRecentEl.classList.add('sorting__button--active');
    sortingBtnRelevantEl.classList.remove('sorting__button--active');
  } else {
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    sortingBtnRelevantEl.classList.add('sorting__button--active');
  }

  //sort job items
  if (isRecentButton) {
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }

  //reset pagination buttons
  renderPaginationButtons();

  //render job items in list
  renderJobList();
}

sortingEl.addEventListener('click', selectSorting);
