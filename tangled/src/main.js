import './style.css';

/**
 * Get and cache states data.
 * For example purposes, we will leave this as is.
 *
 * @returns {Promise<Object>} The states data.
 */
async function getAndCacheStates() {

  // Check if states are in sessionStorage.
  const cached = sessionStorage.getItem('drone-app-messy-example-states');

  if (cached) {
    return JSON.parse(cached);
  }

  const response = await fetch('https://raw.githubusercontent.com/smwoll/refactor-demo/refs/heads/main/state-data.json');
  const states = await response.json();

  // Cache in sessionStorage.
  sessionStorage.setItem('drone-app-messy-example-states', JSON.stringify(states));

  return states;
}


function createMap() {
  const map = document.getElementById('map');

  // Add states grid list.
  const statesList = document.createElement('ul');
  statesList.classList.add('states-list');
  map.appendChild(statesList);
}

async function updateMap() {

  const statesData = await getAndCacheStates();

  const statesList = document.querySelector('.states-list');

  const infoBox = document.getElementById('state-info-box');

  // Clear out any states in list.
  statesList.innerHTML = '';

  // Clear out any state info.
  infoBox.innerHTML = '';

  // Add a state LI for each state.
  for (const state in statesData) {
    const stateLI = document.createElement('li');
    stateLI.dataset.state = state;
    stateLI.classList.add('state-item');
    stateLI.classList.add(state);
    statesList.appendChild(stateLI);

    // Add button within each state LI.
    const stateButton = document.createElement('button');
    stateButton.classList.add('state-button');
    stateButton.type = 'button';
    stateButton.dataset.state = state;

    // Add screen reader text to the button.
    const buttonSRText = document.createElement('span');
    buttonSRText.classList.add('sr-only');
    buttonSRText.textContent = `Click to view ${statesData[state].name}`;
    stateButton.appendChild(buttonSRText);

    // Add a decorative span with the state abbreviation.
    const stateSpan = document.createElement('span');
    stateSpan.role = 'presentation';
    stateSpan.classList.add('state-abbr');
    stateSpan.textContent = state;
    stateButton.appendChild(stateSpan);

    // Handle click on the state.
    function handleStateClick() {
      // Get the LI for this state.
      const stateButton = document.querySelector(
        `button[data-state="${state}"]`
      );

      // Remove the active class from all states.
      document.querySelectorAll('.state-button').forEach((li) => {
        li.classList.remove('active');
      });

      // Add the active class to this state.
      stateButton.classList.add('active');

      const infoBox = document.getElementById('state-info-box');
      infoBox.innerHTML = '';

      const stateName = document.createElement('h2');
      stateName.textContent = statesData[state].name;
      infoBox.appendChild(stateName);

      const stateDetails = document.createElement('dl');
      infoBox.appendChild(stateDetails);

      const stateSightings = document.createElement('dt');
      stateSightings.textContent = 'Sightings:';
      stateDetails.appendChild(stateSightings);

      const stateSightingsValue = document.createElement('dd');
      stateSightingsValue.textContent = statesData[state].sightings;
      stateDetails.appendChild(stateSightingsValue);
    }

    // Add event listener to the button.
    stateButton.addEventListener('click', handleStateClick);

    stateLI.appendChild(stateButton);
  }

  const isChoropleth = map.classList.contains('choropleth-mode');

  const choroplethCheckbox = document.getElementById('choropleth-toggle');

  if (isChoropleth) {
    console.log('is chloro!');
    // Determine the max number of sightings.
    const maxSightings = Math.max(
      ...Object.values(statesData).map((state) => state.sightings)
    );

    // Set % var on each state LI.
    for (const state in statesData) {
      const stateLI = document.querySelector(`li[data-state="${state}"]`);
      stateLI.style.setProperty(
        '--sightings',
        `${(statesData[state].sightings / maxSightings) * 100}%`
      );
    }

    choroplethCheckbox.checked = true;

    const rangeEl = document.querySelector('.chloropleth-range');
    rangeEl.hidden = false;
  } else {
    console.log('not chloro!');
    choroplethCheckbox.checked = false;

    const rangeEl = document.querySelector('.chloropleth-range');
    rangeEl.hidden = true;
  }

  // Add event listener to toggle choropleth.
  function handleChoroplethToggle() {
    console.log('toggling choropleth', !isChoropleth);
    map.classList.toggle('choropleth-mode');
    updateMap();
  }

  // Add event listener to the checkbox.
  choroplethCheckbox.addEventListener('change', handleChoroplethToggle);
}

createMap();

updateMap();
