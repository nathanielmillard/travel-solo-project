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
    domUpdates.updatePreviousTrips();
    domUpdates.updateForm();

  })
  .catch(error => console.log(error))
};


const interactWithForm = () => {
  domUpdates.checkFormCost();
  domUpdates.updateFormImage();
}

const test = () =>{
  alert('test')
}
const submitTrip = () => {
  domUpdates.makeTripRequest();
  setTimeout(function() {getUserData()}, 2000);
  alert('Your agent will let you know if we can make this happen!!')
}

let travelForm = document.querySelector(".trip-request")
travelForm.addEventListener("change", interactWithForm);

let submitButton = document.querySelector(".submit-button")
submitButton.addEventListener("click", submitTrip)
window.onload = getUserData;
