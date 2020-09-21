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

const checkFormCost = () => {
  let travelFormPlace = document.querySelector(".travel-form-place")
  let travelFormDate = document.querySelector(".travel-form-date")
  let travelFormDays = document.querySelector(".travel-form-days")
  let travelFormPeople = document.querySelector(".travel-form-people")
  let travelFormEstimate = document.querySelector(".travel-form-estimate")
  if (travelFormDate.value && travelFormDays.value && travelFormPeople.value){
    let latestTripRequest = domUpdates.allTrips.pop();
    let destination =  domUpdates.allDestinations.find(destination => {
      return destination.destination === travelFormPlace.value
    });
    let trialtrip = {
      id: latestTripRequest.id + 1,
      userID: domUpdates.user.id,
      destinationID: destination.id,
      travelers: travelFormPeople.value,
      date: travelFormDate.value,
      duration: travelFormDays.value,
      status: 'pending',
      suggestedActivities: [],
    }
    let trialTrip = new Trip(trialtrip, destination);
    trialTrip.calculateEstimatedCost();
    travelFormEstimate.innerText = `Estimated Cost: ${trialTrip.estimatedCost}`
  }
}

let travelForm = document.querySelector(".trip-request")
travelForm.addEventListener("change", checkFormCost);

window.onload = getUserData;
