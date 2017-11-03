const test = require('tape');
const logic = require('../logic.js');

var sortFunction = function(a,b) {
  return parseInt(a.id)-parseInt(b.id);
};

const sortByOld = [
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

const sortByNew = [
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
  {
    id: 6,
    description: 'smash avocados',
    priority: true,
    done: false,
  },
];

test('Check old to new sort button', function(t) {
  t.deepEqual(logic.sortTodos(sortByOld, sortFunction), sortByNew, 'Sorted by old to new');
  t.end();
});
