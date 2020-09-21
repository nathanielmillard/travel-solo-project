class Traveler {
  constructor(traveler){
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.pastTrips = [];
    this.presentTrips = [];
    this.futureTrips = [];
    this.pendingTrips = [];
    this.totalSpentAnnually = 0;
  }
}

export default Traveler
