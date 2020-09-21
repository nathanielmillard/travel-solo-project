import chai from 'chai';
const expect = chai.expect;

import trips from '../data/dummyTripsData.js'
import Trip from '../src/trip.js'

let trip1, trip2, trip3

describe.only('Trip Class', () => {
  beforeEach(() => {
    trip1 = new Trip(trips[0])
    trip2 = new Trip(trips[1])
    trip3 = new Trip(trips[2])
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
});
