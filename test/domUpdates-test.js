import chai from 'chai';
const expect = chai.expect;

import domUpdates from '../src/domUpdates.js'
import trips from '../data/dummyTripsData.js'
import destinations from '../data/dummyDestinations.js'
import travelers from '../data/dummyTravelerData.js'
import Traveler from '../src/traveler.js'
import Trip from '../src/trip.js'

let trip1, trip2, trip3, theseTrips, traveler1
let date

describe('DOM', function() {
  beforeEach(()=>{
    trip1 = new Trip(trips[0], destinations[0])
    trip2 = new Trip(trips[1], destinations[0])
    trip3 = new Trip(trips[2], destinations[0])
    theseTrips = [trip1, trip2, trip3]
    theseTrips.forEach((trip) => {
      trip.calculateEstimatedCost();
    });
    traveler1 = new Traveler(travelers[0], theseTrips);
    date = '2019/11/16'
  })
  it('should store some default values', function() {
    expect(domUpdates.user).to.deep.equal({});
    expect(domUpdates.allTrips).to.deep.equal([]);
    expect(domUpdates.allDestinations).to.deep.equal([]);
    expect(domUpdates.today).to.equal('');
  });
  it('should be able to update default values', function() {
    domUpdates.assignKeyValues(traveler1, theseTrips, destinations, date)
    expect(domUpdates.user).to.deep.equal(traveler1);
    expect(domUpdates.allTrips).to.deep.equal(theseTrips);
    expect(domUpdates.allDestinations).to.deep.equal(destinations);
    expect(domUpdates.today).to.equal(date);
  });
});
