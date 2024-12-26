import {
  state,
  bookmarksBtnEl,
  jobDetailsEl,
  jobListBookmarksEl,
} from '../common.js';
import renderJobList from './JobList.js';

function clickHandler(event) {
  //dont continue if the click is not on the bookmark icon
  if (!event.target.className.includes('bookmark')) return;

  //update state
  if (
    state.bookmarkJobItems.some(
      (bookmarkJobItem) => bookmarkJobItem.id === state.activeJobItem.id
    )
  ) {
    state.bookmarkJobItems = state.bookmarkJobItems.filter(
      (bookmarkJobItem) => bookmarkJobItem.id !== state.activeJobItem.id
    );
  } else {
    state.bookmarkJobItems.push(state.activeJobItem);
  }

  //persist data with local storage
  localStorage.setItem(
    'bookmarkJobItems',
    JSON.stringify(state.bookmarkJobItems)
  );

  //update bookmarks icon
  document
    .querySelector('.job-info__bookmark-icon')
    .classList.toggle('job-info__bookmark-icon--bookmarked');

  //render search job list
  renderJobList('search');
}

function mouseEnterHandler() {
  //make bookmarks button look active
  bookmarksBtnEl.classList.add('bookmarks-btn--active');

  // make job list visible
  jobListBookmarksEl.classList.add('job-list--visible');

  //render bookmarks job list
  renderJobList('bookmarks');
}

function mouseLeaveHandler() {
  //make bookmarks button look inactive
  bookmarksBtnEl.classList.remove('bookmarks-btn--active');

  // make job list invisible
  jobListBookmarksEl.classList.remove('job-list--visible');
}

jobDetailsEl.addEventListener('click', clickHandler);
bookmarksBtnEl.addEventListener('mouseenter', mouseEnterHandler);
jobListBookmarksEl.addEventListener('mouseleave', mouseLeaveHandler);
