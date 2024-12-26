import {
  BASE_API_URL,
  state,
  jobDetailsContentEl,
  getData,
} from '../common.js';

import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';
import renderJobList from './JobList.js';

async function loadHashChangeHandler() {
  //get id from URL
  let id = window.location.hash.substring(1);
  if (id) {
    //remove the active class from previously active job item
    document
      .querySelectorAll('.job-item--active')
      .forEach((jobItemwithActiveClass) =>
        jobItemwithActiveClass.classList.remove('job-item--active')
      );

    //remove previous job details content
    jobDetailsContentEl.innerHTML = '';

    //add spinner
    renderSpinner('job-details');
    try {
      //fetch job item data
      let data = await getData(`${BASE_API_URL}/jobs/${id}`);

      //extract job item
      let { jobItem } = data;

      // update state
      state.activeJobItem = jobItem;

      //render search job list
      renderJobList();

      //remove spinner
      renderSpinner('job-details');
      //render job details
      renderJobDetails(jobItem);
    } catch (error) {
      renderSpinner('job-details');
      renderError(error.message);
    }
  }
}

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);
