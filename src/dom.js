import { todo } from "./todo";
import { storage } from "./storage";
import { taskFactory } from "./task-factory";
export const dom = (function () {
  console.log(tasks);
  const renderTasksList = function () {
    let tasksList = document.getElementById("tasks");
    let tasks = todo.getTasks();
    console.log(tasks);
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
      tasksList.innerHTML += `<div class="task">
       <h4>${task.title}</h4>
       <div>
      <button data-index="${index}" class="edit-task">Edit</button>
      <button data-index="${index}" class="toggle-completion">${
        task.isCompleted ? "Mark Incomplete" : "Mark Complete"
      }</button>
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
  };

  const toggleTaskCompletion = function (e) {
    const index = e.target.getAttribute("data-index");
    const task = todo.getTasks()[index];
    console.log("Toggling Completion for Task:", task); // Debug log

    if (task && typeof task.toggleIsCompleted === "function") {
      task.toggleIsCompleted();
    } else {
      console.error("toggleIsCompleted method not found on task", task);
    }
    renderTasksList();
  };

  const editTask = function (e) {
    const index = e.target.getAttribute("data-index");
    const task = todo.getTasks()[index];

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

      storage.saveTasks(todo.getTasks());
      renderTasksList();
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
    const index = e.target.getAttribute("data-index");
    todo.deleteTask(index);
    renderTasksList();
  };

  document.getElementById("new-task").addEventListener("click", function () {
    document.getElementById("form").style.display = "block";
    document.getElementById("new-task").style.display = "none";
  });
  document.getElementById("cancel").addEventListener("click", function () {
    document.getElementById("form").style.display = "none";
    document.getElementById("new-task").style.display = "block";
  });
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    console.log(title, description, dueDate, priority);

    const task = taskFactory.createTask(title, description, dueDate, priority);
    todo.addTask(task);
    renderTasksList();

    document.querySelector("form").reset();
  });
  document.getElementById("inbox").addEventListener("click", function () {
    document.getElementById("page-title").textContent = "Inbox";
  });
  document.getElementById("today").addEventListener("click", function () {
    document.getElementById("page-title").textContent = "Today";
  });

  console.log("dom");

  return {
    renderTasksList,
  };
})();
