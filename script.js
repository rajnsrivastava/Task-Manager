// Retrieve saved tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render the task list
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(function(task, index) {
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    
    const title = document.createElement('h4');
    title.textContent = task.title;

    const description = document.createElement('p');
    description.textContent = task.description;

    const dueDate = document.createElement('p');
    dueDate.textContent = 'Due Date: ' + task.dueDate;

    const priority = document.createElement('p');
    priority.textContent = 'Priority: ' + task.priority;

    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = task.completed;
    completeCheckbox.addEventListener('change', function() {
      tasks[index].completed = this.checked;
      saveTasks();
      renderTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskItem.appendChild(title);
    taskItem.appendChild(description);
    taskItem.appendChild(dueDate);
    taskItem.appendChild(priority);
    taskItem.appendChild(completeCheckbox);
    taskItem.appendChild(deleteButton);

    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
  });
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to handle form submission
document.getElementById('taskForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;

  const newTask = {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  this.reset();
});

// Initial rendering of tasks
renderTasks();
