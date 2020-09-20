import chai from 'chai';
const expect = chai.expect;

import travelers from '../data/dummyTravelerData.js'
import Traveler from '../traveler.js'

describe('Traveler Class', function() {
  beforeEach(()=>{
    const traveler1 = new Traveler(travelers[0]);
    const traveler2 = new Traveler(travelers[1]);
    const traveler3 = new Traveler(travelers[2]);
  })

});
