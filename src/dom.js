import { todo } from "./todo";
export const dom = (function () {
  console.log(tasks);
  const renderTasksList = function () {
    let tasksList = document.getElementById("tasks");
    let tasks = todo.getTasks();
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
      tasksList.innerHTML += `<div class="task">
       <span>${task.title}</span>
       <button class="delete" data-index=${index}>delete</button>
       </div>
       `;
    });

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", todo.deleteTask);
    });
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

    const task = todo.createTask(title, description, dueDate, priority);
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
