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
}

export default Traveler
