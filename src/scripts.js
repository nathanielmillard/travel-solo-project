import domUpdates from './domUpdates'
import Traveler from '../src/traveler.js'
import Trip from '../src/trip.js'

let travelForm = document.querySelector(".trip-request")
let submitButton = document.querySelector(".submit-button")
let logInButton = document.querySelector(".login-button")
let username = document.querySelector(".username")
let password = document.querySelector(".password")
let logInPage = document.querySelector(".log-in-page")
let header = document.querySelector(".header")
let main = document.querySelector(".main")

const getUserData = (number) => {
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
    let specificUser = responses[0].travelers.find(traveler => traveler.id === number)
    let user = new Traveler(specificUser, tripDeck)
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

const submitTrip = () => {
  domUpdates.makeTripRequest();
  console.log(domUpdates.user.id)
  setTimeout(function() {getUserData(domUpdates.user.id)}, 2000);
}

const logIn = () => {
  if (!username.value || !password.value){
    logInButton.innerText = "Try again honey..."
    setTimeout(function() {logInButton.innerText = "Log In"}, 1200)
  } else if (username.value.includes("traveler") && password.value === 'travel2020'){
    let index = parseInt(username.value.split('traveler')[1])
    logInPage.classList.add('hidden')
    main.classList.remove('hidden')
    header.classList.remove('hidden')
    getUserData(index)
  }
}

travelForm.addEventListener("change", interactWithForm);
submitButton.addEventListener("click", submitTrip)
logInButton.addEventListener("click", logIn)
