// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application
(function () {

  // Get all necessary dom node references
  var container = document.getElementById('todo-container');
  var addTodoForm = document.getElementById('add-todo');
  var priorityStar = document.getElementById("priority");

  var state = [{
      id: -3,
      description: 'first todo',
      done: false,
      priority: false
    },
    {
      id: -2,
      description: 'second todo',
      done: false,
      priority: false
    },
    {
      id: -1,
      description: 'third todo',
      done: false,
      priority: false
    },
  ];

  var createTodoNode = function (todo) {
    var todoNode = document.createElement('li');

    // create and append button to toggle whether item done
    var markTodoNode = document.createElement('button');
    markTodoNode.setAttribute('aria-label', 'Mark Todo done button');
    if (todo.done) {
      markTodoNode.className = "fa fa-check-square-o mark-on";
    } else {
      markTodoNode.className = "fa fa-square-o mark-off";
    }
    markTodoNode.addEventListener('click', function (event) {
      var newState = todoFunctions.markTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(markTodoNode);

    // create and append span to hold description
    var itemSpan = document.createElement("span");
    itemSpan.className = "description ";
    var itemDesc = document.createTextNode(todo.description);
    itemSpan.appendChild(itemDesc);
    todoNode.appendChild(itemSpan);

    // this adds a star button that toggles the priority property
    var starButtonNode = document.createElement('button');
    starButtonNode.setAttribute('aria-label', 'Priority flag button');
    if (todo.priority) {
      starButtonNode.className = "fa fa-star star-on";
    } else {
      starButtonNode.className = "fa fa-star-o star-off";
    }
    starButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.starTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(starButtonNode);

    // this adds the delete button
    var deleteButtonNode = document.createElement('button');
    deleteButtonNode.setAttribute('aria-label', 'Delete Button');
    deleteButtonNode.className = "fa fa-times delete";
    deleteButtonNode.addEventListener('click', function (event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(deleteButtonNode);

    return todoNode;
  };

  // Event Listeners for form to add new To Dos
  if (addTodoForm) {
    addTodoForm.addEventListener('submit', function (event) {
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
    priorityStar.addEventListener('click', function (event) {
      if (addTodoForm.priority.checked == true) {
        event.target.className = "fa fa-star star-on checkbox";
      } else {
        event.target.className = "fa fa-star-o star-on checkbox";
      }
    });
  };

  // you should not need to change this function
  var update = function (newState) {
    state = newState;
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function (state) {
    var todoListNode = document.createElement('ul');
    state.forEach(function (todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });
    
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);

})();