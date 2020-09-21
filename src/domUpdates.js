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

}

export default domUpdates
