class Trip {
  constructor (tripData, destination) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.estimatedCost = 0;
    this.destination = destination;
  }
  calculateEstimatedCost() {
    let total = (this.destination.estimatedFlightCostPerPerson * this.travelers)
    total += (this.destination.estimatedLodgingCostPerDay * this.duration)
    total += (total * .1)
    this.estimatedCost = total
    return total
  }
}

export default Trip
