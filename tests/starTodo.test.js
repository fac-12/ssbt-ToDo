const test = require('tape');
const logic = require('../logic.js');

const starTodoBefore = [
  {
    id: 1,
    description: 'smash avocados',
    priority: true,
    done: true,
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
    priority: false,
    done: false,
  },
]

const starToDoAfter = [
  {
    id: 1,
    description: 'smash avocados',
    priority: false,
    done: true,
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
    priority: false,
    done: false,
  },
]

test('Check star is working', function(t) {
   t.deepEqual(logic.starTodo(starTodoBefore,1),starToDoAfter, 'Star is working');
   t.end();
 });
