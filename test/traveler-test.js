import chai from 'chai';
const expect = chai.expect;

import travelers from '../data/dummyTravelerData.js'
import Traveler from '../src/traveler.js'

let traveler1, traveler2, traveler3

describe('Traveler Class', function() {
  beforeEach(()=>{
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
    traveler3 = new Traveler(travelers[2]);
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
});
