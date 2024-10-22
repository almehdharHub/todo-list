import { taskFactory } from "./task-factory";

export const storage = (function () {
  const saveTasks = function (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    // localStorage.clear(); // Clear tasks for testing
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
    if (!Array.isArray(storedTasks)) {
      return [];
    }
    // return storedTasks;
    return storedTasks.map((obj) => {
      return {
        name: obj.name,
        tasks: obj.tasks.map((task) => {
          return taskFactory.createTask(
            task.title,
            task.description,
            task.dueDate,
            task.priority
          );
        }),
      };
    });
  };

  return { saveTasks, loadTasks };
})();
