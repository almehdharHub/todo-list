import "./style.css";
import { todo } from "./todo";

const task = todo.createTask("Task 1", "Description 1", new Date(), 1);

task.addNote("Note 1");
task.addChecklistItem("Checklist item 1");

task.toggleChecklistItem(0);
console.log(`
    ${task.title} ${task.isCompleted}
    ${task.notes[0]}
    ${task.checklist[0].description} ${task.checklist[0].done}
    `);
