import Project from "./Project";
import Todo from "./Todo";
import TodoList from "./TodoList";

class LocalStorage {
  static getTodoList() {
    const todoList = Object.assign(
      new TodoList(),
      JSON.parse(localStorage.getItem("todoList"))
    );

    todoList.setProjects(
      todoList
        .getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    todoList.getProjects().forEach((project) => {
      project.setTodos(
        project.getTodos().map((todo) => Object.assign(new Todo(), todo))
      );
    });
    return todoList;
  }

  static setTodoList(newList) {
    localStorage.setItem("todoList", JSON.stringify(newList));
  }

  //takes object
  static addProject(project) {
    const todoList = LocalStorage.getTodoList();

    todoList.addProject(project);
    LocalStorage.setTodoList(todoList);
  }

  //Couldn't get to compare objects itself
  static deleteProject(projectName) {
    const todoList = LocalStorage.getTodoList();

    todoList.deleteProject(projectName);

    LocalStorage.setTodoList(todoList);
  }

  static addTodo(todo, projectName) {
    console.log(
      `
      From LocalStorage
      TodoName: ${todo.getName()}
      dueDate:${todo.getDate()}
      projectName:${todo.getProjectName()}
      `
    );
    const todoList = LocalStorage.getTodoList();
    todoList.getProject(projectName).addTodo(todo);
    LocalStorage.setTodoList(todoList);
  }

  static deleteTodo(todoName, projectName) {
    const todoList = LocalStorage.getTodoList();
    todoList.getProject(projectName).deleteTodo(todoName);
    LocalStorage.setTodoList(todoList);
  }

  static renameTodo(todo, newName, projectName) {
    const todoList = LocalStorage.getTodoList();
    todoList.getProject(projectName).getTodo(todo).setName(newName);
    LocalStorage.setTodoList(todoList);
  }

  static setTodoDate(todo, newDate, projectName) {
    const todoList = LocalStorage.getTodoList();
    todoList.getProject(projectName).getTodo(todo).setDate(newDate);
    LocalStorage.setTodoList(todoList);
  }

  static updateTodayLocal() {
    const todoList = LocalStorage.getTodoList();
    todoList.updateToday();
    LocalStorage.setTodoList(todoList);
  }

  static updateWeekLocal() {
    const todoList = LocalStorage.getTodoList();
    todoList.updateThisWeek();
    LocalStorage.setTodoList(todoList);
  }

  static updateAllLocal() {
    const todoList = LocalStorage.getTodoList();
    todoList.updateAll();
    LocalStorage.setTodoList(todoList);
  }
}

export default LocalStorage;
