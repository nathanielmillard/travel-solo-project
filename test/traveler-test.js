import chai from 'chai';
const expect = chai.expect;
import moment from 'moment';


import trips from '../data/dummyTripsData.js'
import travelers from '../data/dummyTravelerData.js'
import destinations from '../data/dummyDestinations.js'
import Traveler from '../src/traveler.js'
import Trip from '../src/trip.js'

// var moment = require('moment')
let trip1, trip2, trip3, theseTrips, traveler1, traveler2, traveler3
let date

describe('Traveler Class', function() {
  beforeEach(()=>{
    trip1 = new Trip(trips[0], destinations[0])
    trip2 = new Trip(trips[1], destinations[0])
    trip3 = new Trip(trips[2], destinations[0])
    theseTrips = [trip1, trip2, trip3]
    theseTrips.forEach((trip) => {
      trip.calculateEstimatedCost();
    });
    traveler1 = new Traveler(travelers[0], theseTrips);
    traveler2 = new Traveler(travelers[1], theseTrips);
    // traveler3 = new Traveler(travelers[2], theseTrips);
    date = '2019/11/16'
  });

  it('should instantiate different travelers', () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceof(Traveler);
    expect(traveler2).to.not.deep.equal(traveler1)
  });
  it('should store keys of object passed in', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler1.name).to.equal('Nathaniel Millard');
    expect(traveler1.travelerType).to.equal('relaxer');
  });
  it('should have empty arrays for trips', () => {
    expect(traveler1.pastTrips).to.deep.equal([]);
    expect(traveler1.presentTrips).to.deep.equal([]);
    expect(traveler1.futureTrips).to.deep.equal([]);
    expect(traveler1.pendingTrips).to.deep.equal([]);
  });
  it('should store annual expendature, defaulting to 0', () => {
    expect(traveler1.totalSpentAnnually).to.equal(0);
  });
  it('should be able to calculate year spending', () => {
    traveler1.calculateAnnualSpending(date)
    expect(traveler1.totalSpentAnnually).to.equal(1056);
  });
});
