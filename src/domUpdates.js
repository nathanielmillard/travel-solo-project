import moment from 'moment';

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
      console.log(domUpdates.createCard(trip))
      futureTripCards.insertAdjacentHTML('beforeEnd', domUpdates.createCard(trip))
    });
  },

  createCard: (trip) => {
    let destination = domUpdates.allDestinations.find(destination => {
      return trip.destinationID === destination.id
    })
    return `
    <div class="trip-card ${trip.status}">
      <h5>Where are you headed?</h5>
      <h6 class = "country-title"> ${destination.destination} </h6>
      <img src=${destination.image} alt="Photo of destination">
      <h6>Leaving: ${trip.date}</h6>
    </div>
    `
  },

}

export default domUpdates
