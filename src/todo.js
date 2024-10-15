export const todo = (function () {
  function createTask(
    title,
    description,
    dueDate,
    priority,
    isCompleted = false,
    notes = [],
    checklist = []
  ) {
    const toggleIsCompleted = function () {
      this.isCompleted = !this.isCompleted;
    };
    const addNote = function (note) {
      this.notes.push(note);
    };
    const addChecklistItem = function (item) {
      this.checklist.push({ description: item, done: false });
    };
    const toggleChecklistItem = function (index) {
      this.checklist[index].done = !this.checklist[index].done;
    };

    return {
      title,
      description,
      dueDate,
      priority,
      isCompleted,
      notes,
      checklist,
      toggleIsCompleted,
      addNote,
      addChecklistItem,
      toggleChecklistItem,
    };
  }

  return {
    createTask,
  };
})();
