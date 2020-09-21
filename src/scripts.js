import domUpdates from './domUpdates'
import Traveler from '../src/traveler.js'
import Trip from '../src/trip.js'

const getUserData = () => {
  const today = '2020-09-21'
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  ])
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(responses => {
    let destinations = responses[2].destinations;
    let tripDeck = responses[1].trips.map(trip => {
      let destination = destinations.find(destination => {
        return destination.id === trip.destinationID})
      return new Trip(trip, destination)}
    )
    let user = new Traveler(responses[0].travelers[0], tripDeck)
    domUpdates.assignKeyValues(user, tripDeck, responses[2].destinations, today);
    domUpdates.updateWelcome();
    domUpdates.user.sortTrips();
    domUpdates.updateUpcomingTrips();
  })
  .catch(error => console.log(error))
};


window.onload = getUserData()
