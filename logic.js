//An object holds functions central to the logic of the to do form
//They mostly manipulate the array that represents the to do list
var todoFunctions = {
  
  // generate a unique id for each to do item
  generateId: (function() {

    //initially set to 0
    var idCounter = 0;
    
    return {
      //method to allow idCounter to be set to different number than 0 (due to previously stored list)
      set: function(val) {
        idCounter = val;
      },
      //method to increment idCounter
      incrementCounter: function() {
        idCounter += 1;
        return idCounter;
      }
    };
  })(),

  //cloneArrayOfObjects will create a copy of the todos array
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo){
      return JSON.parse(JSON.stringify(todo));
    });
  },

  //Take current array, new object, add object to array
  addTodo: function(todos, newTodo) {
    var copyTodos = this.cloneArrayOfObjects(todos);
    newTodo.id=this.generateId.incrementCounter();

    //if array is longer than 1, determine is date ascending or descending, then push or unshift new object onto array accordingly.
    if (todos.length > 1) {
      if (parseInt(todos[0].id)>parseInt(todos[1].id)) {
        copyTodos.unshift(newTodo);
      } else {
        copyTodos.push(newTodo);
      }
    } else {
      copyTodos.push(newTodo);
    }
    return copyTodos;
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

  //Take array and sort according to the specified function
  sortTodos: function(todos, sortFunction) {
    var newTodos= this.cloneArrayOfObjects(todos);
    newTodos.sort(sortFunction);
    return newTodos;
  },
};

// Allow code to run in browser and node
if (typeof module !== 'undefined') {
  module.exports = todoFunctions;
}
