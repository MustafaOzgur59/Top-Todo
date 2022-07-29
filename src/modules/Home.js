import TodoList from "./TodoList";
import Todo from "./Todo";
import Project from "./Project";
import LocalStorage from "./LocalStorage";

import {
  renderAddTodoOverlay,
  renderDetailsOverlay,
  renderEditTodoOverlay,
} from "./overlay";

export default class Home {
  static loadHomePage() {
    this.loadHeader();
    this.loadWrapper();
    this.loadFooter();
    const overlay = document.querySelector(".overlay");
    overlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        overlay.classList.toggle("overlay-visible");
        overlay.innerHTML = "";
      }
    });
  }

  static loadWrapper() {
    this.loadSideBar();
    this.loadMainContent();
  }
  static loadHeader() {
    const header = document.querySelector(".header");
    header.innerHTML = `
      <button class="closeMenu">
        <i class="fa-solid fa-bars" id="closeMenuButton"></i>
      </button>
        <div class="logo">
            <h1 class="page-name">Todo List</h1>
        </div>`;
    document.getElementById("closeMenuButton").addEventListener("click", () => {
      const navbar = document.querySelector(".sidebar");
      navbar.classList.toggle("hidden");
      console.log("shiiet");
    });
  }

  static loadSideBar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.innerHTML = `
      <div id="mainProjects">
          <h2>Main Projects</h2>
          <button class="default-project-button" id="today-projects-button">
          <i class="fas fa-calendar-day" aria-hidden="true"></i>
            Today
            <div class="todoCount">
              ${
                LocalStorage.getTodoList().getProject("Today").getTodos().length
              }
              <i class="fas fa-times" aria-hidden="true"></i>
            </div>
            </button>
          <button class="default-project-button" id="week-projects-button">
            <i class="fas fa-calendar-week" aria-hidden="true"></i>
            Week
            <div class="todoCount">
            ${LocalStorage.getTodoList().getProject("Week").getTodos().length}
              <i class="fas fa-times" aria-hidden="true"></i>
            </div>
          </button>
          <button class="default-project-button" id="all-projects-button">
            <i class="fa-solid fa-border-all"></i>
            All
            <div class="todoCount">
            ${LocalStorage.getTodoList().getProject("All").getTodos().length}
              <i class="fas fa-times" aria-hidden="true"></i>
            </div>
          </button>
      </div>
      <div id="userProjects">
        <h2>User Projects</h2>
      </div>
      <button class="add-project-button" id="add-project-button">
          <i class="fa-solid fa-plus"></i>
          Add Project
        </button>
        <div class="add-project-popup" id="add-project-popup">
          <input type="text" name="" id="add-project-input" />
          <div class="popup-buttons">
            <button id="add-project">Add</button>
            <button id="cancel-add-project">Cancel</button>
          </div>
        </div>
      
    `;
    this.initaddProjectButtons();
    this.loadCurrentProjects();
    document
      .querySelector("#today-projects-button")
      .addEventListener("click", () => {
        LocalStorage.updateTodayLocal();
        console.log("Today");
        this.loadTodosforDefaultProjects("Today");
        LocalStorage.getTodoList()
          .getProject("Today")
          .getTodos()
          .forEach((todo) => {
            Home.createTodo(todo);
          });
      });
    document
      .querySelector("#week-projects-button")
      .addEventListener("click", () => {
        LocalStorage.updateWeekLocal();
        console.log("Week");
        this.loadTodosforDefaultProjects("Week");
        LocalStorage.getTodoList()
          .getProject("Week")
          .getTodos()
          .forEach((todo) => {
            Home.createTodo(todo);
          });
      });
    document
      .querySelector("#all-projects-button")
      .addEventListener("click", () => {
        LocalStorage.updateAllLocal();
        console.log("All");
        this.loadTodosforDefaultProjects("All");
        LocalStorage.getTodoList()
          .getProject("All")
          .getTodos()
          .forEach((todo) => {
            Home.createTodo(todo);
          });
      });
  }
  static loadCurrentProjects() {
    LocalStorage.getTodoList()
      .getProjects()
      .forEach((project) => {
        if (
          project.getName() !== "Today" &&
          project.getName() !== "Week" &&
          project.getName() !== "All"
        ) {
          Home.getProjectButton(project.getName(), "userProjects");
        }
      });
  }

  static clearUserProjects() {
    const userProjectsList = document.getElementById("userProjects");
    userProjectsList.innerHTML = `
      <h2>User Projects</h2>
    `;
  }

  static loadMainContent() {}

  static loadFooter() {
    const footer = document.querySelector(".footer");
    footer.innerHTML = `
            <a href="https://github.com/MustafaOzgur59" target="_blank">
                <p>MustafaOzgur59</p>
            </a>
            <a href="https://github.com/MustafaOzgur59" target="_blank">
                <i class="fa-brands fa-github"></i>
            </a>
    `;
  }

  static getProjectButton(projectName, projectListName) {
    const projectList = document.getElementById(projectListName);
    const projectButton = document.createElement("button");

    const leftDiv = document.createElement("div");
    const leftI = document.createElement("i");
    const leftSpan = document.createElement("span");

    const rightDiv = document.createElement("div");
    const todoCount = document.createElement("div");
    todoCount.textContent = LocalStorage.getTodoList()
      .getProject(projectName)
      .getTodos().length;
    todoCount.classList.add("todo-count");
    const rightI = document.createElement("i");

    projectButton.classList.add("user-project-button");
    leftDiv.classList.add("project-button-left");
    leftI.classList.add("fa-solid", "fa-list-check");
    leftSpan.textContent = projectName;
    leftDiv.append(leftI, leftSpan);

    rightDiv.classList.add("project-button-right");
    rightI.classList.add("fas", "fa-times");
    rightDiv.append(todoCount, rightI);

    rightI.addEventListener("click", (e) => {
      this.handleDeleteProject(projectName);
      Home.updataProjectTodoCounts();
      e.stopPropagation();
    });

    projectButton.append(leftDiv, rightDiv);
    projectButton.addEventListener("click", () => {
      this.loadTodosforProject(projectName);
      LocalStorage.getTodoList()
        .getProject(projectName)
        .getTodos()
        .forEach((todo) => {
          Home.createTodo(todo);
        });
    });
    projectList.appendChild(projectButton);
  }

  static initaddProjectButtons() {
    const addProjectbutton = document.getElementById("add-project-button");
    const addProjectPopupButton = document.getElementById("add-project");
    const cancelProjectPopupButton =
      document.getElementById("cancel-add-project");
    const addProjectPopupInput = document.getElementById("add-project-input");

    addProjectbutton.addEventListener("click", this.openAddProjectPopup);
    addProjectPopupButton.addEventListener("click", this.addProject);
    cancelProjectPopupButton.addEventListener(
      "click",
      this.closeAddProjectPopup
    );
    addProjectPopupInput.addEventListener(
      "keypress",
      this.handleAddProjectPopupInput
    );
  }

  static openAddProjectPopup() {
    const addProjectPopup = document.getElementById("add-project-popup");
    const addProjectButton = document.getElementById("add-project-button");

    addProjectPopup.classList.add("active");
    addProjectButton.classList.add("closed");
  }

  static addProject() {
    const addProjectPopupInput = document.getElementById("add-project-input");

    const projectName = addProjectPopupInput.value;

    if (projectName === "" || projectName === null) {
      alert("Please give the project a name");
      return;
    } else if (LocalStorage.getTodoList().contains(projectName)) {
      addProjectPopupInput.value = "";
      alert("A project with this name already exists");
      return;
    }

    LocalStorage.addProject(new Project(projectName));
    Home.getProjectButton(projectName, "userProjects");
    Home.closeAddProjectPopup();
    Home.updataProjectTodoCounts();
  }

  static closeAddProjectPopup() {
    const addProjectPopup = document.getElementById("add-project-popup");
    const popupInput = document.getElementById("add-project-input");
    const addProjectButton = document.getElementById("add-project-button");
    popupInput.value = "";

    addProjectPopup.classList.remove("active");
    addProjectButton.classList.remove("closed");
  }

  static handleAddProjectPopupInput(event) {
    if (event.key === "Enter") {
      Home.addProject();
      Home.updataProjectTodoCounts();
    }
  }

  static handleDeleteProject(projectName) {
    LocalStorage.deleteProject(projectName);
    Home.clearUserProjects();
    Home.loadCurrentProjects();
  }

  static loadTodosforDefaultProjects(projectName) {
    const mainDiv = document.querySelector(".mainContent");
    mainDiv.innerHTML = "";
    const [header, todoListContainer, addTodoButton, addTodoPopup] =
      this.getTodoListDiv(projectName);
    mainDiv.append(header, todoListContainer);
  }

  static loadTodosforProject(projectName) {
    const mainDiv = document.querySelector(".mainContent");
    mainDiv.innerHTML = "";
    const [header, todoListContainer, addTodoButton] =
      this.getTodoListDiv(projectName);
    mainDiv.append(header, todoListContainer, addTodoButton);
    this.initaddTodoButtons();
  }

  static getTodoListDiv(projectName) {
    const projectHeader = document.createElement("h1");
    projectHeader.textContent = projectName;
    projectHeader.id = "projectName";
    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list");
    todoListContainer.id = "todo-list";

    const addTodoButton = document.createElement("button");
    addTodoButton.classList.add("button-add-todo");
    addTodoButton.id = "button-add-todo";
    addTodoButton.innerHTML = `
        <i class="fas fa-plus"></i>
        Add Todo
    `;

    return [projectHeader, todoListContainer, addTodoButton];
  }

  static initaddTodoButtons() {
    const addTodoButton = document.getElementById("button-add-todo");
    addTodoButton.addEventListener("click", () => {
      renderAddTodoOverlay();
    });
  }

  static addTodo() {
    const projectName = document.getElementById("projectName").textContent;
    const popupInput = document.getElementById("add-todo-popup-input");
    const todoName = popupInput.value;

    if (todoName === "" || todoName === undefined || todoName === null) {
      alert("Please enter todo name");
      return;
    }

    if (
      LocalStorage.getTodoList().getProject(projectName).containsTodo(todoName)
    ) {
      alert("Duplicate todo exists");
      popupInput.value = "";
      return;
    }
    const todo1 = new Todo(todoName, projectName);

    LocalStorage.addTodo(todo1, projectName);
    Home.createTodo(todo1);
    Home.closeAddTodopopup();
  }

  static createTodo(todo) {
    const todoList = document.getElementById("todo-list");

    const todoButton = document.createElement("button");
    todoButton.classList.add("todo-button");

    console.log(todo.getName(), todo.getChecked());
    todoButton.id = "todo-button";

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left-todo-div");
    const leftI = document.createElement("i");
    leftI.classList.add("fa-solid", "fa-clipboard-list");
    const todoP = document.createElement("p");
    todoP.innerHTML = `${todo.name}`;
    todoP.classList.add("todo-name");
    leftDiv.append(leftI, todoP);

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right-todo-div");

    const details = document.createElement("div");
    details.classList.add("rightDiv-details");
    details.textContent = "DETAILS";

    const dueDate = document.createElement("p");
    dueDate.classList.add("due-date");
    dueDate.textContent = todo.getDate();
    const rightI1 = document.createElement("i");
    rightI1.classList.add(
      "fa-solid",
      "fa-pen-to-square",
      "todo-change-details"
    );
    const rightI2 = document.createElement("i");
    rightI2.classList.add("fa-solid", "fa-trash-can");
    rightDiv.append(details, dueDate, rightI1, rightI2);

    rightI1.addEventListener("click", () => {
      renderEditTodoOverlay(todo);
    });

    rightI2.addEventListener("click", () => {
      Home.handleDeleteTodo(todo);
      Home.updataProjectTodoCounts();
    });

    details.addEventListener("click", (event) => {
      renderDetailsOverlay(event, todo);
    });

    if (todo.getChecked()) {
      todoButton.classList.add("complete");
      leftI.classList.toggle("fa-clipboard-list");
      leftI.classList.toggle("fa-clipboard-check");
    }
    todoButton.append(leftDiv, rightDiv);
    todoButton.addEventListener("click", () => {
      todoButton.classList.toggle("complete");
      leftI.classList.toggle("fa-clipboard-list");
      leftI.classList.toggle("fa-clipboard-check");
      LocalStorage.checkTodo(todo);
    });
    todoList.appendChild(todoButton);
  }

  static handleAddTodoInput(event) {
    if (event.key === "Enter") this.addTodo();
  }

  static handleDeleteTodo(todo) {
    const projectName = document.getElementById("projectName").textContent;

    if (
      projectName === "Today" ||
      projectName === "Week" ||
      projectName === "All"
    ) {
      LocalStorage.deleteTodo(todo.getName(), todo.getProjectName());
      LocalStorage.deleteTodo(todo.getName(), projectName);
      this.loadTodosforDefaultProjects(projectName);
      LocalStorage.getTodoList()
        .getProject(todo.getProjectName())
        .getTodos()
        .forEach((todo) => {
          Home.createTodo(todo);
        });
    } else {
      LocalStorage.deleteTodo(todo.getName(), todo.getProjectName());
      this.loadTodosforProject(todo.getProjectName());
      LocalStorage.getTodoList()
        .getProject(todo.getProjectName())
        .getTodos()
        .forEach((todo) => {
          Home.createTodo(todo);
        });
    }
  }

  static updataProjectTodoCounts() {
    //TODO: after a project is added or after a todo is added to a project update the counts
    LocalStorage.updateAllLocal();
    LocalStorage.updateTodayLocal();
    LocalStorage.updateWeekLocal();

    const userProjectbuttons = document.querySelectorAll(
      ".user-project-button"
    );
    const defaultProjectButtons = document.querySelectorAll(
      ".default-project-button"
    );

    console.log(defaultProjectButtons);
    defaultProjectButtons.forEach((node) => {
      console.log(node.childNodes[2].textContent.trim());
      node.childNodes[3].childNodes[0].textContent = LocalStorage.getTodoList()
        .getProject(node.childNodes[2].textContent.trim())
        .getTodos().length;
    });

    console.log(userProjectbuttons);
    userProjectbuttons.forEach((node) => {
      node.childNodes[1].childNodes[0].textContent = LocalStorage.getTodoList()
        .getProject(node.childNodes[0].childNodes[1].childNodes[0].textContent)
        .getTodos().length;
    });
  }
}
