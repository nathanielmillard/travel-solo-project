import moment from 'moment';
import Trip from '../src/trip.js';

const domUpdates = {
  user: {},
  allTrips: [],
  allDestinations: [],
  today: '',

  assignKeyValues: (user, allTrips, allDestinations, today) => {
    domUpdates.user = user;
    domUpdates.allTrips = allTrips;
    domUpdates.allDestinations = allDestinations;
    domUpdates.today = today;
  },

  updateWelcome: () => {
    let userNames = domUpdates.user.name.split(' ')
    let welcome = document.querySelector('.welcome-message')
    let date = document.querySelector('.today-input')
    welcome.innerText = 'Welcome Back: ' + userNames[0]
    date.value = domUpdates.today;
  },

  updateUpcomingTrips: () => {
    let futureTripCards = document.querySelector('.future-card-section');
    futureTripCards.innerHTML = ''
    domUpdates.user.futureTrips.forEach((trip) => {
      futureTripCards.insertAdjacentHTML('beforeEnd', domUpdates.createCard(trip))
    });
  },

  createCard: (trip) => {
    let destination = domUpdates.allDestinations.find(destination => {
      return trip.destinationID === destination.id
    })
    return `
    <div class="trip-card ${trip.status}">
      <h4>Where are you headed?</h4>
      <h5 class = "country-title"> ${destination.destination} </h5>
      <img src=${destination.image} alt="Photo of destination">
      <h6>Leaving: ${trip.date}</h6>
    </div>
    `
  },

  updatePreviousTrips: () => {
    let pastTripPhotos = document.querySelector('.image-scroll');
    pastTripPhotos.innerHTML = '';
    domUpdates.user.pastTrips.forEach((trip) => {
      let destination = domUpdates.allDestinations.find(destination => {
        return trip.destinationID === destination.id
      })
      pastTripPhotos.insertAdjacentHTML('beforeEnd',
      `<img src=${destination.image} alt="Photo of destination">`)
    });
    let annualSpending = document.querySelector('.annual-spending')
    domUpdates.user.calculateAnnualSpending(domUpdates.today)
    annualSpending.innerText = `You have spent ${domUpdates.user.totalSpentAnnually} this year.`
  },

  updateForm: () => {
    let whereto = document.querySelector('.where-to')
    domUpdates.allDestinations.forEach((destination) => {
      whereto.insertAdjacentHTML('beforeEnd',
      `<option value="${destination.destination}">${destination.destination}</option>`)
    });
  },

  checkFormCost: () => {
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
  },

  updateFormImage: () => {
    let travelFormPhoto = document.querySelector('.travel-form-photo')
    let travelFormPlace = document.querySelector(".travel-form-place")
    let destination =  domUpdates.allDestinations.find(destination => {
      return destination.destination === travelFormPlace.value
    });
    travelFormPhoto.src = destination.image
  },

  makeTripRequest: () => {
  let travelFormPlace = document.querySelector(".travel-form-place")
  let travelFormDate = document.querySelector(".travel-form-date")
  let travelFormDays = document.querySelector(".travel-form-days")
  let travelFormPeople = document.querySelector(".travel-form-people")
  if (travelFormDate.value && travelFormDays.value && travelFormPeople.value) {
    let destination =  domUpdates.allDestinations.find(destination => {
      return destination.destination === travelFormPlace.value
    });
    let travelFormEstimate = document.querySelector(".travel-form-estimate")
    let latestTripRequest = domUpdates.allTrips.pop();
    let trialTrip = {
      id: latestTripRequest.id + 1,
      userID: parseInt(domUpdates.user.id),
      destinationID: parseInt(destination.id),
      travelers: parseInt(travelFormPeople.value),
      date: moment(travelFormDate.value).format('YYYY/MM/DD'),
      duration: parseInt(travelFormDays.value),
      status: 'pending',
      suggestedActivities: [],
    }
    alert('Your agent will let you know if we can make this happen!!')
    fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(trialTrip)
    })
    .then(response => console.log(response))
    .catch(error => console.log(error))
  } else {
    alert('We still need more info gurl!')
  }
  },


}

export default domUpdates
