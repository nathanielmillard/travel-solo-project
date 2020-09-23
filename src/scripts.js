import domUpdates from './domUpdates'
import moment from 'moment';
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
let travelFormPlace = document.querySelector(".travel-form-place")
let travelFormDate = document.querySelector(".travel-form-date")
let travelFormDays = document.querySelector(".travel-form-days")
let travelFormPeople = document.querySelector(".travel-form-people")

const getUserData = (number) => {
  const today = moment().format('YYYY-MM-DD')
  Promise.all([
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips'),
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  ])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(responses => {
      let tripDeck = responses[1].trips.map(trip => {
        let destination = responses[2].destinations.find(destination => {
          return destination.id === trip.destinationID
        })
        return new Trip(trip, destination)
      })
      let specificUser = responses[0].travelers.find(traveler => traveler.id === number)
      let user = new Traveler(specificUser, tripDeck)
      domUpdates.assignKeyValues(user, tripDeck, responses[2].destinations, today);
      domUpdates.updateSiteInfo()
    })
    .catch(error => console.log(error))
};

const interactWithForm = () => {
  updateFormImage();
  buildInputTrip();
}

const buildInputTrip = () => {
  if (travelFormDate.value && travelFormDays.value && travelFormPeople.value) {
    let destination =  domUpdates.allDestinations.find(destination => {
      return destination.destination === travelFormPlace.value
    });
    let latestTripRequest = domUpdates.allTrips.pop();
    let trialtrip = {
      id: latestTripRequest.id + 1,
      userID: parseInt(domUpdates.user.id),
      destinationID: parseInt(destination.id),
      travelers: parseInt(travelFormPeople.value),
      date: moment(travelFormDate.value).format('YYYY/MM/DD'),
      duration: parseInt(travelFormDays.value),
      status: 'pending',
      suggestedActivities: [],
    }
    domUpdates.checkFormCost(trialtrip, destination)
    return trialtrip
  }
}

const updateFormImage = () => {
  let travelFormPhoto = document.querySelector('.travel-form-photo')
  let destination =  domUpdates.allDestinations.find(destination => {
    return destination.destination === travelFormPlace.value
  });
  travelFormPhoto.src = destination.image
  travelFormPhoto.alt = `Image of ${destination.destination}`
}

const submitTrip = () => {
  if (travelFormDate.value && travelFormDays.value && travelFormPeople.value) {
    alert('Your agent will let you know if we can make this happen!!')
      fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(buildInputTrip())
      })
      .then(response => console.log(response))
      .then(getUserData(domUpdates.user.id))
      .catch(error => console.log(error))
  } else {
    alert('We still need more info gurl!')
  }
}

const logIn = () => {
  if (!username.value || !password.value) {
    logInButton.innerText = "Try again honey..."
    setTimeout(function() {logInButton.innerText = "Log In"}, 1200)
  } else if (username.value.includes("traveler") && password.value === 'travel2020') {
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
