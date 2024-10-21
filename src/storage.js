import { taskFactory } from "./task-factory";

export const storage = (function () {
  const saveTasks = function (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = function () {
    let storedTasks = localStorage.getItem("tasks");

    console.log("Raw loaded data:", storedTasks); // Debug log for raw data

    if (!storedTasks) {
      console.log("No stored tasks found");
      return [];
    }

    try {
      storedTasks = JSON.parse(storedTasks);
    } catch (e) {
      console.error("Error parsing stored tasks:", e);
      return [];
    }

    console.log("Parsed loaded data:", storedTasks); // Debug log for parsed data

    // return storedTasks;
    return storedTasks.tasks.map((task) =>
      taskFactory.createTask(
        task.title,
        task.description,
        task.dueDate,
        task.priority,
        task.isCompleted,
        task.notes,
        task.checklist
      )
    );
  };

  return { saveTasks, loadTasks };
})();
