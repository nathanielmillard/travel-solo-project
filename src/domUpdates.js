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

  checkFormCost: (trip, destination) => {
    let travelFormEstimate = document.querySelector(".travel-form-estimate")
    let trialTrip = new Trip(trip, destination);
    trialTrip.calculateEstimatedCost();
    travelFormEstimate.innerText = `Estimated Cost: ${trialTrip.estimatedCost}`
  },

  updateSiteInfo: () => {
    domUpdates.updateWelcome();
    domUpdates.user.sortTrips();
    domUpdates.updateUpcomingTrips();
    domUpdates.updatePreviousTrips();
    domUpdates.updateForm();
  },


}

export default domUpdates
