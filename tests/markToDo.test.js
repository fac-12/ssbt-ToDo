const test = require('tape');
const logic = require('../logic.js');

const dummyMarkArr = [
  {
    id: 0,
    description: 'smash avocados',
    done: false,
  },
  {
    id: 1,
    description: 'make coffee',
    done: false,
  },
  {
    id: 2,
    description: 'buy tea',
    done: false,
  },
  {
    id: 3,
    description: 'buy coffee',
    done: false,
  },
];

const dummyArrMark1 = [
  {
    id: 0,
    description: 'smash avocados',
    done: false,
  },
  {
    id: 1,
    description: 'make coffee',
    done: true,
  },
  {
    id: 2,
    description: 'buy tea',
    done: false,
  },
  {
    id: 3,
    description: 'buy coffee',
    done: false,
  },
];

test('Function returns an array of same length', function(t) {
   t.equal(logic.markTodo(dummyMarkArr,2).length, dummyMarkArr.length, 'Function returns an array of the same length');
   t.end();
 });

 test('Function returns dummyArr minus id #1', function(t) {

  t.deepEquals(logic.markTodo(dummyMarkArr,1),dummyArrMark1,'Function marks id #1 as done.');
  t.end();
  });

  