import chai from 'chai';
const expect = chai.expect;

import trips from '../data/dummyTripsData.js'
import destinations from '../data/dummyDestinations.js'
import Trip from '../src/trip.js'

let trip1, trip2, trip3, destination1

describe('Trip Class', () => {
  beforeEach(() => {
    trip1 = new Trip(trips[0], destinations[0])
    trip2 = new Trip(trips[1], destinations[0])
    trip3 = new Trip(trips[2], destinations[0])
    destination1 = destinations[0]
  });

  it('be able to instantiate multiple trips', () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceof(Trip);
    expect(trip2).to.not.equal(trip1);
  });
  it('it should keep properties on object passed in', () => {
    expect(trip1.id).to.equal(1)
    expect(trip1.userID).to.equal(1)
    expect(trip1.travelers).to.equal(1)
    expect(trip1.date).to.equal("2019/09/16")
    expect(trip1.duration).to.equal(8)
    expect(trip1.status).to.equal("approved")
    expect(trip1.suggestedActivities).to.deep.equal([])
  });
  it('have a default estimated cost of 0', () => {
    expect(trip1.estimatedCost).to.equal(0)
  });
  it('it should calculated estimated cost', () => {
    trip1.calculateEstimatedCost(destination1);
    expect(trip1.estimatedCost).to.equal(1056)
  });
});
