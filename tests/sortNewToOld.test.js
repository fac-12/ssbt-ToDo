const test = require('tape');
const logic = require('../logic.js');

var sortFunction = function(a,b) {
  return parseInt(b.id)-parseInt(a.id);
};

const sortByNew = [
  {
    id: 6,
    description: 'smash avocados',
    priority: true,
    done: false,
  },
  {
    id: 1,
    description: 'make coffee',
    priority: true,
    done: false,
  },
  {
    id: 2,
    description: 'buy tea',
    priority: true,
    done: false,
  },
  {
    id: 3,
    description: 'buy coffee',
    priority: true,
    done: false,
  },
];

const sortByOld = [
  {
    id: 6,
    description: 'smash avocados',
    priority: true,
    done: false,
  },
  {
    id: 3,
    description: 'buy coffee',
    priority: true,
    done: false,
  },
  {
    id: 2,
    description: 'buy tea',
    priority: true,
    done: false,
  },
  {
    id: 1,
    description: 'make coffee',
    priority: true,
    done: false,
  },  
];

test('Check new to old sort button', function(t) {
  t.deepEqual(logic.sortTodos(sortByNew, sortFunction), sortByOld, 'Sorted by new to old');
  t.end();
});
