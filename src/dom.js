import { todo } from "./todo";
export const dom = (function () {
  console.log(tasks);
  const renderTasksList = function () {
    const tasksList = document.getElementById("tasks");
    let tasks = todo.getTasks();
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
      tasksList.innerHTML += `<tr>
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.dueDate}</td>
      <td>${task.priority}</td>
      <td>${task.isCompleted}</td>
      <td>${task.notes}</td>
      <td>${task.checklist[0] ? task.checklist[0].description : ""}</td>
      <td><button class="delete" data-index="${index}">Delete</button></td>
      <td><button class="edit" data-index="${index}">Edit</button></td>
      </tr>`;
    });
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", todo.deleteTask);
    });
  };
  const newTaskButton = document.querySelector("button");
  const newTask = document.querySelector("input");
  console.log("dom");

  newTaskButton.addEventListener("click", function () {
    const task = todo.createTask(newTask.value);
    todo.addTask(task);
    renderTasksList();
    newTask.value = "";
  });

  return {
    renderTasksList,
  };
})();
