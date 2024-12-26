import {
  BASE_API_URL,
  state,
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  errorTextEl,
  errorEl,
  getData,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

//-- SEARCH COMPONENT --

async function submitHandler(event) {
  // prevent default behavior
  event.preventDefault();

  // get search text
  let searchText = searchInputEl.value;

  //validation (regular expression example)
  let forbiddenPatern = /[@,$,#,%,^,&]/;
  let patternMach = forbiddenPatern.test(searchText);
  if (patternMach) {
    renderError('Your search may not contain special characters');
    return;
  }

  //blur input
  searchInputEl.blur();

  //remove previous job items
  jobListSearchEl.innerHTML = '';

  //reset sorting buttons
  sortingBtnRecentEl.classList.remove('sorting__button--active');
  sortingBtnRelevantEl.classList.add('sorting__button--active');

  //render spinner
  renderSpinner('search');

  try {
    //fetch search results
    let data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);

    //extract job items
    let { jobItems } = data;

    //update state
    state.searchJobItems = jobItems;
    state.currentPage = 1;

    //remove spinner
    renderSpinner('search');

    //render number of results
    numberEl.textContent = jobItems.length;

    //reset pagination buttons
    renderPaginationButtons();

    // render job items in search job list
    renderJobList();
  } catch (error) {
    renderSpinner('search');
    renderError(error.message);
  }

  // fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       //4xx, 5xx status code
  //       throw {
  //         message: 'Resource or server issue',
  //         name: 'Error',
  //       };
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     //extract job items
  //     let { jobItems } = data;

  //     //remove spinner
  //     renderSpinner('search');

  //     //render number of results
  //     numberEl.textContent = jobItems.length;
  //     // render job items in search job list
  //     renderJobList(jobItems);
  //   })
  //   .catch((error) => {
  //     renderSpinner('search');
  //     renderError(error.message);
  //   });
}
searchFormEl.addEventListener('submit', submitHandler);
