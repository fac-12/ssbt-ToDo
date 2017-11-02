// Part 1. Fill in any missing parts of the todoFunction object!
// you can access these on todo.todoFunctions
// For part one we expect you to use tdd

var todoFunctions = {
  // todoFunctions.generateId() will give you a unique id
  // You do not need to understand the implementation of this function.
  generateId: function(todos) {
    //find max id in current array
    var idCounter = todos.reduce(function(a,b) {
      return parseInt(a.id) > parseInt(b.id) ? a.id : b.id;
    }, 0);

    return idCounter+1;
  },

  

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo){
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, newTodo) {
    var copyTodos = this.cloneArrayOfObjects(todos);
    newTodo.id=this.generateId(todos);
    return copyTodos.concat(newTodo);
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

  sortTodos: function(todos, sortFunction) {
    // stretch goal! Do this last
    // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
    // sortFunction will have same signature as the sort function in array.sort
    // hint: array.slice, array.sort
  },
};


// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}
