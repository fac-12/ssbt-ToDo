// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
  generateId: (function() {
    var idCounter = 0;
    //reset idCounter to current max id if a list already exists
    return {
      set: function(val) {
        idCounter = val;
      },
      incrementCounter: function() {
        idCounter += 1;
        return idCounter;
      }
    };
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo){
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    if (newTodo.description.length === 0) {
    alert("You've not entered a to do item!");
  } else {
    var copyTodos = this.cloneArrayOfObjects(todos);
    newTodo.id=this.generateId.incrementCounter();
    console.log("id assigned is "+newTodo.id);
    return copyTodos.concat(newTodo);
  }
  },


  deleteTodo: function(todos, idToDelete) {
   var newTodos = todos.filter(function(todo){
        return todo.id !== idToDelete;
    });
    return newTodos;
  },

  markTodo: function(todos, idToMark) {
    var newTodos = this.cloneArrayOfObjects(todos);
    var targetObj = newTodos.find(function(x) {
      return x.id == idToMark;
    });
    targetObj.done = !targetObj.done;
    return newTodos;
  },

  starTodo: function(todos, idToStar) {
    var newTodos = this.cloneArrayOfObjects(todos);
    var targetObj = newTodos.find(function(x) {
      return x.id == idToStar;
    });
    targetObj.priority = !targetObj.priority;
    return newTodos;
  },

  sortTodos: function(todos, sortFunction) {
    var newTodos= this.cloneArrayOfObjects(todos);
    newTodos.sort(sortFunction);
    return newTodos;
  },
};


// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}
