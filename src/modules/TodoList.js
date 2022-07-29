import Todo from "./Todo";
import Project from "./Project";
import { isToday, isThisWeek, parseISO } from "date-fns";

export default class TodoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project("Today"));
    this.projects.push(new Project("Week"));
    this.projects.push(new Project("All"));
  }

  setProjects(newProjects) {
    this.projects = newProjects;
  }

  getProjects() {
    return this.projects;
  }

  getProject(projectName) {
    return this.projects.find((project) => project.getName() === projectName);
  }

  contains(projectName) {
    return this.projects.some((project) => project.getName() == projectName);
  }

  addProject(newProject) {
    if (this.contains(newProject.getName())) {
      console.log("There is a project with the same name");
      alert("There is a project with the same name");
      return false;
    } else {
      this.projects.push(newProject);
    }
  }

  deleteProject(projectName) {
    this.projects = this.projects.filter(
      (project) => project.getName() !== projectName
    );
  }

  updateToday() {
    this.getProject("Today").todos = [];

    const tempTodos = [];

    this.projects.forEach((project) => {
      if (
        project.getName() === "Today" ||
        project.getName() === "Week" ||
        project.getName() === "All"
      ) {
        return;
      } else {
        project.todos.forEach((todo) => {
          if (isToday(parseISO(todo.getDate()))) {
            tempTodos.push(todo);
          }
        });
      }
    });
    this.getProject("Today").setTodos(tempTodos);
  }

  updateThisWeek() {
    this.getProject("Week").todos = [];

    const tempTodos = [];

    this.projects.forEach((project) => {
      if (
        project.getName() === "Today" ||
        project.getName() === "Week" ||
        project.getName() === "All"
      ) {
        return;
      } else {
        project.todos.forEach((todo) => {
          if (isThisWeek(parseISO(todo.getDate()))) {
            tempTodos.push(todo);
          }
        });
      }
    });
    this.getProject("Week").setTodos(tempTodos);
  }

  updateAll() {
    this.getProject("All").todos = [];

    const tempTodos = [];

    this.projects.forEach((project) => {
      if (
        project.getName() === "Today" ||
        project.getName() === "Week" ||
        project.getName() === "All"
      ) {
        return;
      } else {
        project.todos.forEach((todo) => {
          tempTodos.push(todo);
        });
      }
    });
    this.getProject("All").setTodos(tempTodos);
  }
}
