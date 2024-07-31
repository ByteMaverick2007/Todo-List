document.addEventListener('DOMContentLoaded', getTodos);
document.querySelector('.form').addEventListener('submit', addTodo);
document.querySelector('.filter-todo').addEventListener('change', filterTodo);

function addTodo(event) {
  event.preventDefault();
  const todoInput = document.querySelector('#tambah');
  const todoList = document.querySelector('.todo-list');
  const todoText = todoInput.value.trim();

  if (todoText) {
    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    // Create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    todoDiv.appendChild(newTodo);

    // Create buttons div
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('todo-buttons');

    // Add complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', completeTodo);
    buttonsDiv.appendChild(completeButton);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', deleteTodo);
    buttonsDiv.appendChild(deleteButton);

    // Append buttons div to todo div
    todoDiv.appendChild(buttonsDiv);

    // Append to list
    todoList.appendChild(todoDiv);

    // Save todo to local storage
    saveLocalTodos(todoText);

    // Clear todo input value
    todoInput.value = '';
  }
}

function deleteTodo(event) {
  const item = event.target.parentElement.parentElement;
  item.remove();
  removeLocalTodos(item);
}

function completeTodo(event) {
  const item = event.target.parentElement.parentElement;
  item.classList.toggle('completed');
}

function filterTodo() {
  const todos = document.querySelectorAll('.todo-item');
  const filter = document.querySelector('.filter-todo').value;

  todos.forEach(function (todo) {
    switch (filter) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    const todoList = document.querySelector('.todo-list');

    // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');

    // Create list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    // Create buttons div
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('todo-buttons');

    // Add complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', completeTodo);
    buttonsDiv.appendChild(completeButton);

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', deleteTodo);
    buttonsDiv.appendChild(deleteButton);

    // Append buttons div to todo div
    todoDiv.appendChild(buttonsDiv);

    // Append to list
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
