// storage.js
export const storage = (function () {
  const saveTasks = function (tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = function () {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    return storedTasks || [];
  };

  return { saveTasks, loadTasks };
})();
