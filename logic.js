//An object holds functions central to the logic of the to do form
//They mostly manipulate the array that represents the to do list
var todoFunctions = {
  
  // generate a unique id for each to do item
  generateId: (function() {
    var idCounter = 0;

    function incrementCounter() {
      return (idCounter += 1);
    }

    return incrementCounter;
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  cloneArrayOfObjects: function(todos) {
    return [].concat(todos);
  },

  //Take current array, new object, add object to array
  addTodo: function(todos, newTodo) {
    newTodo.id=this.generateId();
    return todos.concat(newTodo);
  },

  //Take array and remove object with specified id
  deleteTodo: function(todos, idToDelete) {
   var newTodos = todos.filter(function(todo){
        return todo.id !== idToDelete;
    });
    return newTodos;
  },

  //Take array and toggle done property of object with specificed id
  markTodo: function(todos, idToMark) {
    var newTodos = this.cloneArrayOfObjects(todos);
    var targetObj = newTodos.find(function(x) {
      return x.id == idToMark;
    });
    targetObj.done = !targetObj.done;
    return newTodos;
  },

  //Take array and toggle done property of object with specificed id
  starTodo: function(todos, idToStar) {
    var newTodos = this.cloneArrayOfObjects(todos);
    var targetObj = newTodos.find(function(x) {
      return x.id == idToStar;
    });
    targetObj.priority = !targetObj.priority;
    return newTodos;
  },
};

// Allow code to run in browser and node
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}
