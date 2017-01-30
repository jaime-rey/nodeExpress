/**
 * Created by Jaime on 30/01/2017.
 */
let fortune = require('../lib/fortune.js');
let expect = require('chai').expect;
suite('Fortune cookie tests', function(){
    test('getFortune() should return a fortune', function(){
        expect(typeof fortune.getFortune() === 'string');
    });
});
/**mocha -u tdd -R spec qa/tests-unit.js*/