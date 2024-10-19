import { createTask } from "./task-factory";

export const storage = (function () {
  const saveTasks = function (tasks) {
    // Debug log to see tasks being saved
    console.log("Saving tasks:", tasks);
    console.log(tasks);
    const plainTasks = tasks.map((task) => ({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      isCompleted: task.isCompleted,
      notes: task.notes,
      checklist: task.checklist,
    }));
    localStorage.setItem("tasks", JSON.stringify(plainTasks));
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
      console.error("Stored tasks is not an array:", storedTasks);
      return [];
    }
    // return storedTasks;
    return storedTasks.map((task) =>
      createTask(
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
