import Todo from "../Todo";
import LocalStorage from "../LocalStorage";
import TodoList from "../TodoList";
import Project from "../Project";
import Home from "./Home";
function renderDetailsOverlay(event, todo) {
  const overlayDiv = document.querySelector(".overlay");
  overlayDiv.innerHTML = "";

  const cardDiv = document.createElement("div");
  cardDiv.classList.add("details-overlay-card");
  const todoName = document.createElement("div");
  const dueDate = document.createElement("div");
  const priority = document.createElement("div");
  const description = document.createElement("div");
  const projectName = document.createElement("div");

  const closeButton = document.createElement("i");
  closeButton.classList.add("fa-solid", "fa-times", "close-detail");
  closeButton.addEventListener("click", () => {
    overlayDiv.classList.toggle("overlay-visible");
    overlayDiv.innerHTML = "";
  });
  todoName.textContent = `Todo Name: ${todo.getName()}`;
  dueDate.textContent = `Todo Date: ${todo.getDate()}`;
  priority.textContent = `Todo Priority: ${todo.getPriority()}`;
  description.textContent = `Todo Description: ${todo.getDescription()}`;
  projectName.textContent = `Project: ${todo.getProjectName()}`;

  cardDiv.append(
    closeButton,
    todoName,
    dueDate,
    priority,
    description,
    projectName
  );
  overlayDiv.innerHTML = "";
  overlayDiv.appendChild(cardDiv);
  overlayDiv.classList.toggle("overlay-visible");
}

function renderAddTodoOverlay() {
  const overlay = document.querySelector(".overlay");

  const addTodoContainer = document.createElement("div");
  addTodoContainer.classList.add("create-new-todo");
  const headerDiv = document.createElement("div");
  const header = document.createElement("h2");
  headerDiv.classList.add("create-new-todo-header");
  header.textContent = "Create a new Todo";
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-times");
  headerDiv.append(header, closeIcon);

  closeIcon.addEventListener("click", () => {
    overlay.classList.toggle("overlay-visible");
    overlay.innerHTML = "";
  });

  const textareaTodo = document.createElement("textarea");
  textareaTodo.placeholder = "Todo:Go to gym";
  const textareaProject = document.createElement("textarea");
  textareaProject.placeholder = "Project:Fitness";
  textareaProject.textContent = document
    .querySelector(".mainContent")
    .querySelector("#projectName").textContent;
  const textareaDetails = document.createElement("textarea");
  textareaDetails.placeholder = "Details:Don't forget your shake";

  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("create-todo-date-div");
  const dueDateP = document.createElement("p");
  dueDateP.textContent = "Due Date:";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.classList.add("create-todo-date-input");
  dueDateInput.setAttribute("id", "create-todo-date-input");
  dueDateInput.setAttribute("required", "");
  dueDateInput.name = "new-todo-date-input";
  dueDateInput.valueAsDate = new Date();
  dueDateDiv.append(dueDateP, dueDateInput);

  const priorityWrapper = document.createElement("div");
  priorityWrapper.classList.add("create-todo-priority-wrapper");
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("create-todo-priority-div");
  const priorityP = document.createElement("p");
  priorityP.textContent = "Priority: ";

  const priorityLow = document.createElement("button");
  priorityLow.classList.add("priority-low-button");
  priorityLow.textContent = "LOW";
  priorityLow.addEventListener("click", () => {
    priorityLow.classList.add("active");
    priorityMedium.classList.remove("active");
    priorityHigh.classList.remove("active");
  });

  const priorityMedium = document.createElement("button");
  priorityMedium.classList.add("priority-medium-button");
  priorityMedium.textContent = "MEDIUM";
  priorityMedium.addEventListener("click", () => {
    priorityLow.classList.remove("active");
    priorityMedium.classList.add("active");
    priorityHigh.classList.remove("active");
  });

  const priorityHigh = document.createElement("button");
  priorityHigh.classList.add("priority-high-button");
  priorityHigh.textContent = "HIGH";
  priorityDiv.append(priorityP, priorityLow, priorityMedium, priorityHigh);
  priorityHigh.addEventListener("click", () => {
    priorityLow.classList.remove("active");
    priorityMedium.classList.remove("active");
    priorityHigh.classList.add("active");
  });

  const addTodoButton = document.createElement("button");
  addTodoButton.textContent = "Add Todo";
  addTodoButton.classList.add("create-todo-add-button");

  addTodoButton.addEventListener("click", () => {
    addTodoHandler(
      textareaTodo.value,
      textareaProject.value,
      textareaDetails.value,
      dueDateInput.value,
      priorityDiv.querySelector(".active")
    );
  });

  priorityWrapper.append(priorityDiv, addTodoButton);
  addTodoContainer.append(
    headerDiv,
    textareaTodo,
    textareaProject,
    textareaDetails,
    dueDateDiv,
    priorityWrapper
  );

  overlay.innerHTML = "";
  overlay.append(addTodoContainer);
  overlay.classList.toggle("overlay-visible");
}

function addTodoHandler(todoName, projectName, details, dueDate, priority) {
  if (todoName === "" || todoName === undefined || todoName === null) {
    alert("Please enter todo name");
    return;
  }
  if (!LocalStorage.getTodoList().contains(projectName)) {
    alert("Project doesn't exist");
    return;
  }
  if (
    LocalStorage.getTodoList().getProject(projectName).containsTodo(todoName)
  ) {
    alert("Duplicate todo exists");
    popupInput.value = "";
    return;
  }
  if (priority === undefined || priority === null) {
    alert("Please select a priority");
    return;
  }
  const todo1 = new Todo(
    todoName,
    projectName,
    details,
    dueDate,
    priority.textContent
  );

  LocalStorage.addTodo(todo1, projectName);
  Home.createTodo(todo1);
  document.querySelector(".overlay").classList.toggle("overlay-visible");
  document.querySelector(".overlay").innerHTML = "";
}

function renderEditTodoOverlay(todo) {
  const overlay = document.querySelector(".overlay");
  const editTodoContainer = document.createElement("div");
  editTodoContainer.classList.add("create-new-todo");
  const headerDiv = document.createElement("div");
  const header = document.createElement("h2");
  headerDiv.classList.add("create-new-todo-header");
  header.textContent = "Edit Todo";
  const closeIcon = document.createElement("i");
  closeIcon.classList.add("fa-solid", "fa-times");
  headerDiv.append(header, closeIcon);

  closeIcon.addEventListener("click", () => {
    overlay.classList.toggle("overlay-visible");
    overlay.innerHTML = "";
  });

  const textareaTodo = document.createElement("textarea");
  textareaTodo.placeholder = "Todo:Go to gym";
  textareaTodo.textContent = todo.getName();
  const textareaProject = document.createElement("textarea");
  textareaProject.placeholder = "Project:Fitness";
  textareaProject.textContent = todo.getProjectName();
  const textareaDetails = document.createElement("textarea");
  textareaDetails.placeholder = "Details:Don't forget your shake";
  textareaDetails.textContent = todo.getDescription();

  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("create-todo-date-div");
  const dueDateP = document.createElement("p");
  dueDateP.textContent = "Due Date:";
  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.classList.add("create-todo-date-input");
  dueDateInput.setAttribute("id", "create-todo-date-input");
  dueDateInput.setAttribute("required", "");
  dueDateInput.name = "new-todo-date-input";
  dueDateInput.value = todo.getDate();
  dueDateDiv.append(dueDateP, dueDateInput);

  const priorityWrapper = document.createElement("div");
  priorityWrapper.classList.add("create-todo-priority-wrapper");
  const priorityDiv = document.createElement("div");
  priorityDiv.classList.add("create-todo-priority-div");
  const priorityP = document.createElement("p");
  priorityP.textContent = "Priority: ";

  const priorityLow = document.createElement("button");
  priorityLow.classList.add("priority-low-button");
  priorityLow.textContent = "LOW";
  priorityLow.addEventListener("click", () => {
    priorityLow.classList.add("active");
    priorityMedium.classList.remove("active");
    priorityHigh.classList.remove("active");
  });

  const priorityMedium = document.createElement("button");
  priorityMedium.classList.add("priority-medium-button");
  priorityMedium.textContent = "MEDIUM";
  priorityMedium.addEventListener("click", () => {
    priorityLow.classList.remove("active");
    priorityMedium.classList.add("active");
    priorityHigh.classList.remove("active");
  });

  const priorityHigh = document.createElement("button");
  priorityHigh.classList.add("priority-high-button");
  priorityHigh.textContent = "HIGH";
  priorityDiv.append(priorityP, priorityLow, priorityMedium, priorityHigh);
  priorityHigh.addEventListener("click", () => {
    priorityLow.classList.remove("active");
    priorityMedium.classList.remove("active");
    priorityHigh.classList.add("active");
  });

  priorityDiv.childNodes.forEach((node) => {
    if (node.textContent === todo.getPriority()) {
      node.classList.add("active");
    }
  });

  const editTodoButton = document.createElement("button");
  editTodoButton.textContent = "Edit Todo";
  editTodoButton.classList.add("create-todo-add-button");

  editTodoButton.addEventListener("click", () => {
    editTodoHandler(
      todo,
      textareaTodo.value,
      textareaProject.value,
      textareaDetails.value,
      dueDateInput.value,
      priorityDiv.querySelector(".active")
    );
  });

  priorityWrapper.append(priorityDiv, editTodoButton);
  editTodoContainer.append(
    headerDiv,
    textareaTodo,
    textareaProject,
    textareaDetails,
    dueDateDiv,
    priorityWrapper
  );

  overlay.innerHTML = "";
  overlay.append(editTodoContainer);
  overlay.classList.toggle("overlay-visible");
}

function editTodoHandler(
  todo,
  todoName,
  projectName,
  details,
  dueDate,
  priority
) {
  if (todoName === "" || todoName === undefined || todoName === null) {
    alert("Please enter todo name");
    return;
  }
  if (!LocalStorage.getTodoList().contains(projectName)) {
    alert("Project doesn't exist");
    return;
  }
  if (priority === undefined || priority === null) {
    alert("Please select a priority");
    return;
  }
  const todo1 = new Todo(
    todoName,
    projectName,
    details,
    dueDate,
    priority.textContent
  );

  const todoList = LocalStorage.getTodoList();
  const projectIndex = todoList.projects.indexOf(
    todoList.getProject(projectName),
    0
  );
  const todoIndex = todoList.projects[projectIndex].todos.indexOf(
    todoList.getProject(projectName).getTodo(todo.getName()),
    0
  );
  todoList.projects[projectIndex].todos[todoIndex] = todo1;
  LocalStorage.setTodoList(todoList);
  Home.loadTodosforProject(projectName);
  LocalStorage.getTodoList()
    .getProject(projectName)
    .getTodos()
    .forEach((todo) => {
      Home.createTodo(todo);
    });
  document.querySelector(".overlay").classList.toggle("overlay-visible");
  document.querySelector(".overlay").innerHTML = "";
}

export { renderDetailsOverlay, renderAddTodoOverlay, renderEditTodoOverlay };
