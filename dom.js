// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function() {

  // Get all necessary dom node references
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var sortOldButton= document.getElementById('sortOld');
  var sortNewButton= document.getElementById('sortNew');
  var sortStarButton = document.getElementById('sortStar');
  var priorityStar = document.getElementById("priority");

  //get local storage references
  var localState = localStorage.getItem('state');

  //Pulls in current state (the list array) from local storage
  if (localState) {
    var state = JSON.parse(localState);

    //set the base id to the current max id in list
    todoFunctions.generateId.set(state.reduce(function(a, b) {
      return a > parseInt(b.id) ? a : parseInt(b.id);
    }, 0));
  } else {
    //initial to do list if no stored state
    var state = [
      { id: -3, description: 'first todo' },
      { id: -2, description: 'second todo' },
      { id: -1, description: 'third todo' },
    ];
  }
  
  // This function takes a todo item from the array, it returns the DOM node representing that todo. Triggered every time the array changes at all by the renderState function.
  var createTodoNode = function(todo) {
    var todoNode = document.createElement('li');

    // create and append button to toggle whether item done
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

    // create and append span to hold description (clicking also toggles done property)
    var itemSpan = document.createElement("span");
    itemSpan.className = "description ";
    itemSpan.addEventListener('click', function(event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    })
    var itemDesc = document.createTextNode(todo.description);     
    itemSpan.appendChild(itemDesc);
    todoNode.appendChild(itemSpan);

    // this adds a star button that toggles the priority property
    var starButtonNode = document.createElement('button');
    if(todo.priority){
      starButtonNode.className = "fa fa-star star-on";
    } else {
      starButtonNode.className = "fa fa-star-o star-off";
    }
    starButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.starTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(starButtonNode);

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.className = "fa fa-times delete";
    deleteButtonNode.addEventListener('click', function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    return todoNode;
  };

  // Event Listeners for form to add new To Dos
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function(event) {
      event.preventDefault();
      //only take action if at least one character entered.
      if (event.target.description.value.length > 1) {
        var todoObj = {};
        todoObj.description = event.target.description.value;
        event.target.description.value = "";
        todoObj.done = false;
        todoObj.priority = event.target.priority.checked;
        event.target.priority.checked = false;
        priorityStar.className = "fa fa-star-o star-off checkbox";
        var newState = todoFunctions.addTodo(state, todoObj);
        update(newState);
      }
    });
    priorityStar.addEventListener('click', fillStar, false);
    function fillStar(e){
      if (addTodoForm.priority.checked == true) {
        e.target.className = "fa fa-star star-on checkbox";
      } else {
        e.target.className = "fa fa-star-o star-on checkbox";
      }
    }
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
