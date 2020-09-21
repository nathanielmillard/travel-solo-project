import moment from 'moment';

class Traveler {
  constructor(traveler, tripsData){
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
    this.allTrips = tripsData;
    this.totalSpentAnnually = 0;
  }
  calculateAnnualSpending (today) {
    let mytrips = this.allTrips.filter(trip => trip.userID === this.id)
      this.totalSpentAnnually = mytrips.reduce((total, trip) => {
      if(moment(trip.date).year() === moment(today).year()){
        total += trip.estimatedCost
      }
      return total
    }, 0)
  }
  sortTrips (today) {
    let mytrips = this.allTrips.filter(trip => trip.userID === this.id);
    mytrips = mytrips.map(trip => {
      trip.calculateEstimatedCost()
      return trip
    })
    mytrips.forEach((trip) => {
      if(moment(trip.date).format('YYYY-MM-DD') > moment(today).format('YYYY-MM-DD')) {
        this.futureTrips.push(trip)
      } if (moment(trip.date).format('YYYY-MM-DD') < moment(today).format('YYYY-MM-DD')){
        this.pastTrips.push(trip)
      } if (trip.status === 'pending') {
        this.pendingTrips.push(trip)
      }
    });
  }
}

export default Traveler
