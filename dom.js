// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {
  // This is the dom node where we will keep our todo
  //get dom node references
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var sortOldButton= document.getElementById('sortOld');
  var sortNewButton= document.getElementById('sortNew');
  var sortStarButton = document.getElementById('sortStar');
  //get local storage references
  var localState = localStorage.getItem('state');
  var priorityStar = document.getElementById("priority");

  //Pulls in current state from local storage
  if (localState) {
    var state = JSON.parse(localState);
    todoFunctions.generateId.set(state.reduce(function(a, b) {
      return a > parseInt(b.id) ? a : parseInt(b.id);
    }, 0));
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

    // add markTodo button
    var markTodoNode = document.createElement('button');
    if (todo.done) {
      markTodoNode.className = "fa fa-check-square-o mark-on";
    } else {
      markTodoNode.className = "fa fa-square-o mark-off";
    }
    markTodoNode.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markTodoNode);

    // add span holding description
    var s = document.createElement("span");
    s.className = "description ";
    s.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    })
    if (todo.priority === true) {
      s.className += "priority ";
    }
    var d = document.createTextNode(todo.description);     // Create a text node for description
    s.appendChild(d);
    todoNode.appendChild(s);                                     // Append the text to <span>

    // this adds a priority button
    var priorityButtonNode = document.createElement('button');
    if(todo.priority){
      priorityButtonNode.className = "fa fa-star star-on";
    } else {
       priorityButtonNode.className = "fa fa-star-o star-off";
    }
    priorityButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.starTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(priorityButtonNode);

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.className = "fa fa-times delete";
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);


    // add classes for css

    return todoNode;
  };

  if (priorityStar) {
    priorityStar.addEventListener('click', fillStar, false);
    function fillStar(e){
      if (addTodoForm.priority.checked == true) {
        e.target.className = "fa fa-star star-on checkbox";
      } else {
        e.target.className = "fa fa-star-o star-on checkbox";
      }
    }
  }

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
      priorityStar.className = "fa fa-star-o star-off checkbox";
      var newState = todoFunctions.addTodo(state, todoObj);
      update(newState);
    });
  };

  //Sort Button Listeners
  if(sortOldButton){
    sortOldButton.addEventListener('click',function(event){
      activateSort(this,[sortNewButton,sortStarButton]);
    });
  }

  if(sortNewButton){
      sortNewButton.addEventListener('click',function(event){
        activateSort(this,[sortOldButton,sortStarButton]);
      });
  }

  if(sortStarButton) {
    sortStarButton.addEventListener('click', function(event) {
      activateSort(this,[sortOldButton,sortNewButton]);
    });
  }

  //Function to activate Sort
  var activateSort = function(turnOn, offArr) {
    turnOn.classList.add("highlight");
    offArr.forEach(function(x) {
      x.classList.remove("highlight");
    });
    if (turnOn == sortOldButton) {
      var sortFunction = function(a,b) {
        return parseInt(a.id)-parseInt(b.id);
      };
    } else if (turnOn == sortNewButton) {
      var sortFunction = function(a,b) {
        return parseInt(b.id)-parseInt(a.id);
      };
    } else {
      var sortFunction = function(a,b) {
        return b.priority-a.priority;
      };
    };
    var newState = todoFunctions.sortTodos(state, sortFunction);
    update(newState);
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
