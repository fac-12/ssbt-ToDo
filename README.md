# Explanation of To Do App Code

### **_The Basics_**

The to do list app has two main responsibilities:
1. It creates and updates a list of to do items (storing and manipulating data)
2. It provides a user interface to display and interact with the list (displaying data, taking user input to alter data)

The list is represented by an array (a list) of objects (key-value pairs), like this:
```javascript=
var todoList = [
  {
    id: 0,
    description: 'smash avocados',
    done: true,
  },
  {
    id: 1,
    description: 'make coffee',
    done: false,
  },
];
```


_Why do i have two javascript files?_

Javascript is often split into multiple files on a project to make it easier to organize. In this project, you can split the functionality into two different camps, like that specified above. One set of functions manipulates the array itself (i.e. adding items, deleting items, marking items as complete). The other set of functions communicates with the DOM, accepting user input and displaying an updated list.

The first set of functions can be written as pure functions following the rules of TDD. The second set of functions rely on side effects (rendering changes in the DOM), so they are not pure functions. So it's nice (but not necessary) to split them into two files. 

_Why are my logic.js functions in an object called todoFunctions?_

It is just a way to group functions that do a similar thing together, like saying they all belong to the same family. When you call the functions, you need to put `todoFunctions.` in front (like `todoFunctions.addTodo`). It also then makes it easier to export them for testing using `module.exports = todoFunctions;`instead of listing each function individually.

_Why is all of the code in dom.js wrapped in something called an iife?_

"iife" stands for "immediately-invoked function expression". You will notice that it is an anonymous function that is invoked right away (scroll down to bottom of the page as see the `()` that calls it immediately.) iife wrappers are often used to create privacy and preserve variables in a local context. There is a good article [here](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). If one did not wrap the dom.js code in the iife, the functionality would be exactly the same, just with the functions running in the global context rather than the iife's context. 

Notice that the generateId function is also an iife, which is critically important  because it allows the idCounter to increment without resetting to zero each time the function runs. There is an explanation of this specific use in the article linked above in the section "A final aside: The Module Pattern"

This isn't important to understand well right now, so don't worry too much if it seems confusing.

---

### **_How does the code work_**?
**_Inital page load_**

When the browser loads your html file, it loads the logic.js file and then the dom.js file. 

The iife function in dom.js immediately executes. In order, this does the following without any user input:
1. loads the variables getting all necessary dom references
2. sets a global variable `state` to an array representing your initial to do list
3. stores the function `createTodoNode`
4. if the `addTodoForm` DOM reference exists (the reference variable was set in step #1), it adds an event listener to the form and to the star checkbox.
5. stores the functions `update` and `renderState`
6. if the `container` DOM reference exists (the reference variable was set in step #1), it invokes the function `renderState(state)`, using the `state` variable set in #2 as the argument.
7. `renderState(state)` creates an empty `<ul>` element and for each item in the array `state` it calls the function `createTodoNode`.

    `createTodoNode` was defined in #3. It takes an object representing one item of your to do list (one element of your array) and returns a DOM node representing that item. It does that like so: 
    
    1. creates an `<li>` element
    2. creates a `<button>` element that visually depicts the item's`done` value and allows the user to toggle it on or off with a `click` event listener. Appends that `<button>` to the `<li>`.
    3. creates a `<span>` element with a text node that holds the item's `description` value. Appends that `<button>` to the `<li>`.
    4. creates a `<button>` element that visually depicts the item's`priority` value and allows the user to toggle it on or off with a `click` event listener. Appends that `<button>` to the `<li>`.
    5. creates a `<button>` element that allows the user to delete the item with a `click` event listener. Appends that `<button>` to the `<li>`.
    6. Returns the completed `<li>` element
    
    `renderState(state)` then takes that `<li>` returned by `createTodoNode` and appends it to the `<ul>` it created. It replaces the container's first child (which is an empty `<ul>`, see html code) with the `<ul>` it has just created, populated by the items in your `state` array.
    
**_User interaction_**

What happens next depends on the user's input. There are two event listeners on the form to add new items.

8. If the form is submitted, it calls the anonymous function defined in `addTodoForm`'s event listener (#4). This:

    1. prevents any default action (like the page refreshing).
    2. creates a new object and populates its key-value pairs according to what is submitted in the form (the description and the priority).
    3. Resets the form input.
    4. calls `todoFunctions.addTodo` with the current `state` and newly created object as arguments, which returns a new array `newState` including the object.
    5. calls the function `update(newState)`, which sets the variable `state` to `newState` and then calls `renderState(state)`, which takes you back to #7, redrawing the whole list `<ul>` and using it to replace the current `<ul>`
    
9. The `priorityStar` event listener is attached to the priority checkbox, which is styled as a star icon using CSS. The event listener merely ensures that the appearance of the star reflects whether the checkbox is checked or not (the checkbox is not visible due to CSS but clicking on the star icon checks and unchecks it).

10. The `markTodoNode` event listener calls `todoFunctions.markTodo` with the current `state` and id of the desired item to mark as done or undone. This function returns a new array `newState` with the specified item's `done` property toggled. Then calls `update(newState)` as described in #8.5
11. The `starButtonNode` event listener calls `todoFunctions.starTodo` with the current `state` and id of the desired item to mark as priority or not. This function returns a new array `newState` with the specified item's `priority` property toggled. Then calls `update(newState)` as described in #8.5
12. The `deleteButtonNode` event listener calls `todoFunctions.deleteTodo` with the current `state` and id of the desired item to delete. This function returns a new array `newState` with the specified item absent from the array. Then calls `update(newState)` as described in #8.5

**_The todoFunctions_**

The todoFunctions `addTodo`, `deleteTodo`, `markTodo`, and `starTodo` are all used when called in #8.4, #12, #10 and #11 respectively. The take the old array, make changes to it and return a new array. These are pure functions so easily testable.

The todoFunctions `generateId` and `cloneArrayOfObjects` are used by the other todoFunctions.

---
Let me know if you have any other questions or don't understand anything. Hopefully this was helpful?
