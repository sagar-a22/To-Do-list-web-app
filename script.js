document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task));
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const task = { text: taskText, completed: false };
  renderTask(task);
  saveTask(task);

  taskInput.value = '';
}

function renderTask(task) {
  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.onchange = () => {
    li.classList.toggle('completed');
    task.completed = checkbox.checked;
    updateLocalStorage();
  };

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => editTask(span, task);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = () => {
    li.remove();
    removeTask(task);
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
  const taskListItems = document.querySelectorAll('#taskList li');
  const tasks = [];

  taskListItems.forEach(li => {
    const text = li.querySelector('.task-text').textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskToRemove) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.text !== taskToRemove.text);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(spanElement, task) {
  const newText = prompt('Edit task:', spanElement.textContent);
  if (newText && newText.trim() !== '') {
    spanElement.textContent = newText.trim();
    task.text = newText.trim();
    updateLocalStorage();
  }
}
