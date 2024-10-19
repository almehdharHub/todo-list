// project.js
import { createTodo } from "./todo";

const projects = [];

export function createProject(name) {
  const project = { name, todos: [] };
  projects.push(project);
  return project;
}

export function addTodoToProject(project, todo) {
  project.todos.push(todo);
}

export function getProjects() {
  return projects;
}
