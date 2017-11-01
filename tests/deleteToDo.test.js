const test = require('tape');
const logic = require('../logic.js');

const dummyArr = [
  {
    id: 0,
    description: 'smash avocados',
    done: true,
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

test('Tape is working', function(t) {
  t.equals(1,1,"one equals one");
  t.end();
})

test('Function returns an array', function(t) {
   t.equal(Array.isArray(logic.deleteTodo([],2)),true, 'Function returns an array');
   t.end();
 });

 test('Function returns an array one shorter than input array', function(t) {
   t.equals(dummyArr.length-logic.deleteTodo(dummyArr,1).length, 1, 'Function returns an array one shorter than input array');
   t.end();
 });

