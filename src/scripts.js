import domUpdates from './domUpdates'

const getUserData = () => {
  const today = '2020/09/21'
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(responses => domUpdates.assignKeyValues(responses[0][0], responses[1], responses[2], today))
  .then(console.log(domUpdates))
  .catch(error => console.log(error))
};

window.onload = getUserData()
