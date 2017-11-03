var test = require('tape');
var logic = require('../logic');

var testObj = [
  {
    id: -1,
    description: "smashed",
    done: true,
},

 {
   id: 0,
   description: "coffee",
   done: false,
 },
];

var newTestObj =
  {
    description: "new2",
    done: true,
  };

test('tape is working', function(t) {
  const actual = 1;
  const expected = 1;
  t.equals(actual, expected, 'one should equal one');
  t.end();
})


// test('Test string added to Todo array', function(t){
//   t.deepEqual(logic.addTodo([], {description:'do washing up'}),[{id:0, description:'do washing up'}], 'washing up added to list');
//   t.end();
// });
//
// test('Test two strings can be added to Todo array', function(t){
//   logic.addTodo([], 'do washing up');
//   t.deepEqual(logic.addTodo([], 'take bins out'),['do washing up', 'take bins out'], 'second item added to list');
//   t.end();
// });

test('check add to do', function(t) {
  var actual = logic.addTodo(testObj, newTestObj);
  var expected = [
    {
      id: -1,
      description: "smashed",
      done: true,
  },
   {
     id: 0,
     description: "coffee",
     done: false,
   },
   {
     id: 1,
     description: "new2",
     done: true,
   },
  ];
  t.deepEqual(actual, expected, "new obj added to the array");
  t.end();
});
