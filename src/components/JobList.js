import {
  RESULTS_PER_PAGE,
  BASE_API_URL,
  state,
  jobListSearchEl,
  jobDetailsContentEl,
  getData,
  jobListBookmarksEl,
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderJobDetails from './JobDetails.js';
import renderError from './Error.js';

function renderJobList(wichJobList = 'search') {
  //determine correct selector for job list (saerch results list or bookmarks list)
  const jobListEl =
    wichJobList === 'search' ? jobListSearchEl : jobListBookmarksEl;
  // //remove previous job items
  jobListEl.innerHTML = '';
  // pag 1 = 0,7
  //pag 2 = 7,14
  //pag 3 = 14,21

  //determine the job items to be rendered
  let jobItems;
  if (wichJobList === 'search') {
    jobItems = state.searchJobItems.slice(
      (state.currentPage - 1) * RESULTS_PER_PAGE,
      state.currentPage * RESULTS_PER_PAGE
    );
  } else if (wichJobList === 'bookmarks') {
    jobItems = state.bookmarkJobItems;
  }

  //display job items

  jobItems.forEach(function (jobItem) {
    const newJobItemHTML = `<li class="job-item ${state.activeJobItem.id === jobItem.id ? 'job-item--active' : ''}">
            <a class="job-item__link" href="${jobItem.id}">
                <div class="job-item__badge">${jobItem.badgeLetters}</div>
                <div class="job-item__middle">
                    <h3 class="third-heading">${jobItem.title}</h3>
                    <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                        <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${jobItem.salary}</p>
                        <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${jobItem.location}</p>
                    </div>
                </div>
                <div class="job-item__right">
                    <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarkJobItems.some((bookmarkJobItem) => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked'}"></i>
                    <time class="job-item__time">${jobItem.daysAgo}d</time>
                </div>
            </a>
        </li>`;

    //insert HTML
    jobListEl.insertAdjacentHTML('beforeend', newJobItemHTML);
  });
}
//--JOB LIST COMPONENT--
async function selecJobItem(event) {
  //prevent default behavior (navigation)
  event.preventDefault();

  //get job item element
  let jobItemEl = event.target.closest('.job-item');
  let badgeLetter = jobItemEl.querySelector('.job-item__badge');
  let backgroundColor = window.getComputedStyle(badgeLetter).backgroundColor;

  //remove the active class from previously active job item
  document
    .querySelectorAll('.job-item--active')
    .forEach((jobItemwithActiveClass) =>
      jobItemwithActiveClass.classList.remove('job-item--active')
    );

  //empty the job details section
  jobDetailsContentEl.innerHTML = '';

  //render spinner
  renderSpinner('job-details');

  //get the id
  const id = jobItemEl.children[0].getAttribute('href');

  // update state
  const allJobItems = [...state.searchJobItems, ...state.bookmarkJobItems];
  state.activeJobItem = allJobItems.find((jobItem) => jobItem.id === +id);

  // render search job list
  renderJobList();

  //add id to url

  history.pushState(null, '', `/#${id}`);

  try {
    //fetch job item data
    let data = await getData(`${BASE_API_URL}/jobs/${id}`);

    //extract job item
    let { jobItem } = data;

    //remove spinner
    renderSpinner('job-details');
    //render job details
    renderJobDetails(jobItem, backgroundColor);
  } catch (error) {
    renderSpinner('job-details');
    renderError(error.message);
  }

  // fetch(`${BASE_API_URL}/jobs/${id}`)
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
  //     // extract job item
  //     let { jobItem } = data;

  //     //remove spinner
  //     renderSpinner('job-details');

  //     //render job details
  //     renderJobDetails(jobItem, backgroundColor);
  //   })
  //   .catch((error) => {
  //     renderSpinner('job-details');
  //     renderError(error.message);
  //   });
}
jobListSearchEl.addEventListener('click', selecJobItem);
jobListBookmarksEl.addEventListener('click', selecJobItem);

export default renderJobList;
