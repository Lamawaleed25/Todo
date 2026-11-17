// Retrieve todo from a local storage or initialize an empty arrray
let todo = JSON.parse(localStorage.getItem("Todo")) || [];

const todoInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("counter");
const addButton = document.querySelector(".button");
const deleteButton = document.getElementById("deleteAll");

// console.log(todoInput);

//initialize the todo list
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newtask = todoInput.value.trim();
  if (newtask !== "") {
    todo.push({
      text: newtask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((task, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="TodoContainer">
        <input type="checkbox" class="todo-checkbox"
        id="input-${index}" ${task.disabled ? "checked" : ""}>
        <p id="todo-${index}" class="${
          task.disabled ? "disabled" : ""
        }" onclick="editTask(${index})">${task.text}</p>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
        </div>
        
      `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingTask = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingTask;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedTask = inputElement.value.trim();
    if (updatedTask) {
      todo[index].text = updatedTask;
      saveToLocalStorage();
    }
    displayTasks();
  });
}
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("Todo", JSON.stringify(todo));
}
