import './style.css'

const STATES = {
  "AL": { "name": "Alabama", "sightings": 40 },
  "AK": { "name": "Alaska", "sightings": 11 },
  "AS": { "name": "American Samoa", "sightings": 0 },
  "AZ": { "name": "Arizona", "sightings": 22 },
  "AR": { "name": "Arkansas", "sightings": 3 },
  "CA": { "name": "California", "sightings": 5 },
  "CO": { "name": "Colorado", "sightings": 6 },
  "CT": { "name": "Connecticut", "sightings": 7 },
  "DE": { "name": "Delaware", "sightings": 8 },
  "DC": { "name": "District of Columbia", "sightings": 19 },
  "FL": { "name": "Florida", "sightings": 50 },
  "FM": { "name": "Federated States of Micronesia", "sightings": 10 },
  "GA": { "name": "Georgia", "sightings": 11 },
  "GU": { "name": "Guam", "sightings": 12 },
  "HI": { "name": "Hawaii", "sightings": 13 },
  "ID": { "name": "Idaho", "sightings": 4 },
  "IL": { "name": "Illinois", "sightings": 5 },
  "IN": { "name": "Indiana", "sightings": 6 },
  "IA": { "name": "Iowa", "sightings": 7 },
  "KS": { "name": "Kansas", "sightings": 8 },
  "KY": { "name": "Kentucky", "sightings": 9 },
  "LA": { "name": "Louisiana", "sightings": 20 },
  "ME": { "name": "Maine", "sightings": 10 },
  "MD": { "name": "Maryland", "sightings": 11 },
  "MH": { "name": "Marshall Islands", "sightings": 1 },
  "MA": { "name": "Massachusetts", "sightings": 2 },
  "MI": { "name": "Michigan", "sightings": 7 },
  "MN": { "name": "Minnesota", "sightings": 16 },
  "MS": { "name": "Mississippi", "sightings": 23 },
  "MO": { "name": "Missouri", "sightings": 6 },
  "MT": { "name": "Montana", "sightings": 1 },
  "MP": { "name": "Northern Mariana Islands", "sightings": 1 },
  "NE": { "name": "Nebraska", "sightings": 1 },
  "NV": { "name": "Nevada", "sightings": 1 },
  "NH": { "name": "New Hampshire", "sightings": 1 },
  "NJ": { "name": "New Jersey", "sightings": 55 },
  "NM": { "name": "New Mexico", "sightings": 1 },
  "NY": { "name": "New York", "sightings": 1 },
  "NC": { "name": "North Carolina", "sightings": 1 },
  "ND": { "name": "North Dakota", "sightings": 1 },
  "OH": { "name": "Ohio", "sightings": 1 },
  "OK": { "name": "Oklahoma", "sightings": 1 },
  "OR": { "name": "Oregon", "sightings": 1 },
  "PW": { "name": "Palau", "sightings": 1 },
  "PA": { "name": "Pennsylvania", "sightings": 1 },
  "PR": { "name": "Puerto Rico", "sightings": 1 },
  "RI": { "name": "Rhode Island", "sightings": 1 },
  "SC": { "name": "South Carolina", "sightings": 1 },
  "SD": { "name": "South Dakota", "sightings": 1 },
  "TN": { "name": "Tennessee", "sightings": 1 },
  "TX": { "name": "Texas", "sightings": 1 },
  "UT": { "name": "Utah", "sightings": 1 },
  "VI": { "name": "U.S. Virgin Islands", "sightings": 1 },
  "VT": { "name": "Vermont", "sightings": 1 },
  "VA": { "name": "Virginia", "sightings": 1 },
  "WA": { "name": "Washington", "sightings": 1 },
  "WV": { "name": "West Virginia", "sightings": 1 },
  "WI": { "name": "Wisconsin", "sightings": 1 },
  "WY": { "name": "Wyoming", "sightings": 1 }
};

const appTarget = document.getElementById('app');

function createMap() {
  const map = document.createElement('div');
  map.id = 'map';
  appTarget.appendChild(map);

  // Add states grid list.
  const statesList = document.createElement('ul');
  statesList.classList.add('states-list');
  map.appendChild(statesList);
}

function updateMap() {
  const statesList = document.querySelector('.states-list');

  const infoBox = document.getElementById('state-info-box');

  // Clear out any states in list.
  statesList.innerHTML = '';

  // Clear out any state info.
  infoBox.innerHTML = '';

  // Add a state LI for each state.
  for (const state in STATES) {
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
    buttonSRText.textContent = `Click to view ${STATES[state].name}`;
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
      const stateButton = document.querySelector(`button[data-state="${state}"]`);

      // Remove the active class from all states.
      document.querySelectorAll('.state-button').forEach(li => {
        li.classList.remove('active');
      });

      // Add the active class to this state.
      stateButton.classList.add('active');

      const infoBox = document.getElementById('state-info-box');
      infoBox.innerHTML = '';

      const stateName = document.createElement('h2');
      stateName.textContent = STATES[state].name;
      infoBox.appendChild(stateName);

      const stateDetails = document.createElement('dl');
      infoBox.appendChild(stateDetails);

      const stateSightings = document.createElement('dt');
      stateSightings.textContent = 'Sightings:';
      stateDetails.appendChild(stateSightings);

      const stateSightingsValue = document.createElement('dd');
      stateSightingsValue.textContent = STATES[state].sightings;
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
    const maxSightings = Math.max(...Object.values(STATES).map(state => state.sightings));

    // Set % var on each state LI.
    for (const state in STATES) {
      const stateLI = document.querySelector(`.${state}`);
      stateLI.style.setProperty('--sightings', `${STATES[state].sightings / maxSightings * 100}%`);
    }

    choroplethCheckbox.checked = true;
  } else {
    console.log('not chloro!');
    choroplethCheckbox.checked = false;
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
