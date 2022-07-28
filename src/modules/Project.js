class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  setName(newName) {
    this.name = newName;
  }

  getName() {
    return this.name;
  }

  getTodos() {
    return this.todos;
  }

  setTodos(newTodos) {
    this.todos = newTodos;
  }

  getTodo(todoName) {
    return this.todos.find((todo) => todo.getName() == todoName);
  }

  containsTodo(todoName) {
    return this.todos.some((todo) => todo.getName() === todoName);
  }

  addTodo(newTodo) {
    if (this.todos.find((todo) => todo.getName() === newTodo.getName())) {
      console.log("A todo with same name exists in this project");
      alert("A todo with same name exists in this project");
      return false;
    } else {
      this.todos.push(newTodo);
    }
  }

  deleteTodo(todoName) {
    this.todos = this.todos.filter((todo) => todo.getName() !== todoName);
  }
}

export default Project;
