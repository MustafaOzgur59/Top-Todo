class Todo {
  constructor(name, projectName, details, dueDate, priority) {
    this.name = name;
    this.projectName = projectName;
    this.details = details;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  setName(newName) {
    this.name = newName;
  }

  getName() {
    return this.name;
  }

  setProjectName(newProjectName) {
    this.projectName = newProjectName;
  }

  getProjectName() {
    return this.projectName;
  }

  setDate(newDate) {
    this.dueDate = newDate;
  }

  getDate() {
    return this.dueDate;
  }

  setDescription(newDetails) {
    this.details = newDetails;
  }

  getDescription() {
    return this.details;
  }

  getPriority() {
    return this.priority;
  }

  setPriority(newPriority) {
    this.priority = newPriority;
  }
}

export default Todo;
