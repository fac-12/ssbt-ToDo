// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var localState = localStorage.getItem('state');

  //Pulls in current state from local storage
  if (localState) {
    var state = JSON.parse(localState);
  } else {
    var state = [
      { id: -3, description: 'first todo' },
      { id: -2, description: 'second todo' },
      { id: -1, description: 'third todo' },
    ]; // this is our initial todoList  
  }
  
  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');
    // you will need to use addEventListener

    // add span holding description
    var s = document.createElement("span");
    s.className = "description ";
    if (todo.priority === true) {
      s.className += "priority ";
    }
    var d = document.createTextNode(todo.description);     // Create a text node for description
    s.appendChild(d);
    todoNode.appendChild(s);                                     // Append the text to <span>

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.classname = "delete ";
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    // add markTodo button
    var markTodoNode = document.createElement('button');
    markTodoNode.classname = "mark ";
    markTodoNode.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });

    todoNode.appendChild(markTodoNode);


    // add classes for css

    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var todoObj = {};
      todoObj.description = event.target.description.value;
      event.target.description.value = "";
      todoObj.done = false;
      todoObj.priority = event.target.priority.checked;
      event.target.priority.checked = false;
      var newState = todoFunctions.addTodo(state, todoObj);
      update(newState);
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement('ul');

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    //Stores the state in local memory
    localStorage.setItem('state', JSON.stringify(state));

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);

})();
