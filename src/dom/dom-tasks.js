import { todo } from "../todo";
import { taskFactory } from "../task-factory";
import { storage } from "../storage";
export const domTasks = (function () {
  let projectIndex = document
    .getElementById("page-title")
    .getAttribute("data-project-index");
  const renderTasksList = function (tasks) {
    let tasksList = document.getElementById("tasks");
    tasksList.innerHTML = "";

    tasks.forEach((task, index) => {
      tasksList.innerHTML += `<div class="task">
       <h4>${task.title}</h4>
       <p>${task.dueDate === "" ? "No due date" : task.dueDate}</p>
       <p>priority: ${task.priority}</p>
       <button data-index="${index}" class="toggle-completion">${
        task.isCompleted ? "Mark Incomplete" : "Mark Complete"
      }</button>
       
       <div>
      <button data-index="${index}" class="edit-task">Edit</button>
      <button data-index="${index}" class="delete-task">Delete</button>
      </div>
       </div>
       `;
    });

    const editButtons = document.querySelectorAll(".edit-task");
    editButtons.forEach((button) => {
      button.addEventListener("click", editTask);
    });

    const toggleCompletionButtons =
      document.querySelectorAll(".toggle-completion");
    toggleCompletionButtons.forEach((button) => {
      button.addEventListener("click", toggleTaskCompletion);
    });
    const deleteButtons = document.querySelectorAll(".delete-task");

    deleteButtons.forEach((button) => {
      button.addEventListener("click", deleteTask);
    });
    storage.saveTasks(todo.getAllTasks());
  };
  const toggleTaskCompletion = function (e) {
    projectIndex = document
      .getElementById("page-title")
      .getAttribute("data-project-index");
    const index = e.target.getAttribute("data-index");
    const task = todo.getTasks(projectIndex)[index];
    console.log("Toggling Completion for Task:", task); // Debug log

    if (task && typeof task.toggleIsCompleted === "function") {
      task.toggleIsCompleted();
    } else {
      console.error("toggleIsCompleted method not found on task", task);
    }
    renderTasksList(todo.getTasks(projectIndex));
  };

  const editTask = function (e) {
    projectIndex = document
      .getElementById("page-title")
      .getAttribute("data-project-index");
    const index = e.target.getAttribute("data-index");
    const task = todo.getTasks(projectIndex)[index];

    const originalValues = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    };

    // Pre-fill dialog with task details or placeholders
    const titleElem = document.getElementById("edit-title");
    const descriptionElem = document.getElementById("edit-description");
    titleElem.innerText = task.title || titleElem.getAttribute("placeholder");
    descriptionElem.innerText =
      task.description || descriptionElem.getAttribute("placeholder");
    document.getElementById("edit-due-date").value = task.dueDate;
    document.getElementById("edit-priority").value = task.priority;

    const modal = document.getElementById("dialog");
    modal.showModal();

    const saveBtn = document.getElementById("save-task");
    const cancelBtn = document.getElementById("cancel-task");

    saveBtn.onclick = function () {
      task.title = titleElem.innerText;
      task.description = descriptionElem.innerText;
      task.dueDate = document.getElementById("edit-due-date").value;
      task.priority = document.getElementById("edit-priority").value;

      renderTasksList(todo.getTasks(projectIndex));
      modal.close();
    };

    cancelBtn.onclick = function () {
      // Revert to original values
      titleElem.innerText = originalValues.title;
      descriptionElem.innerText = originalValues.description;
      document.getElementById("edit-due-date").value = originalValues.dueDate;
      document.getElementById("edit-priority").value = originalValues.priority;
      modal.close();
    };

    const closeButton = document.getElementById("close-modal");
    closeButton.addEventListener("click", function () {
      modal.close();
    });
  };
  const deleteTask = function (e) {
    projectIndex = document
      .getElementById("page-title")
      .getAttribute("data-project-index");
    const index = e.target.getAttribute("data-index");
    todo.deleteTask(index, projectIndex);
    renderTasksList(todo.getTasks(projectIndex));
  };
  const OpenNewTaskFormBtn = document.getElementById("new-task");
  OpenNewTaskFormBtn.addEventListener("click", function () {
    document.getElementById("form").style.display = "block";
    document.getElementById("new-task").style.display = "none";
  });
  const cancelNewTaskFormBtn = document.getElementById("cancel");
  cancelNewTaskFormBtn.addEventListener("click", function () {
    document.getElementById("form").style.display = "none";
    document.getElementById("new-task").style.display = "block";
    document.getElementById("title").value = "";
  });
  const addTaskForm = document.getElementById("add-task");
  addTaskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    projectIndex = document
      .getElementById("page-title")
      .getAttribute("data-project-index");

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    console.log(title, description, dueDate, priority);
    console.log(projectIndex);
    const task = taskFactory.createTask(title, description, dueDate, priority);

    todo.addTask(task, projectIndex);
    renderTasksList(todo.getTasks(projectIndex));

    addTaskForm.reset();
  });
  return {
    renderTasksList,
  };
})();
