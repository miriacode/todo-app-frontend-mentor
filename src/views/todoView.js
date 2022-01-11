class ToDoView {
  constructor(todoController) {
    this.todoController = todoController;
    this.paintTasks(this.todoController.getAll());

    this.themeStorage = new ThemeStorageController("themes");
    this.theme = this.themeStorage.getTheme();
  }
  
  getTheme() {
    return this.theme;
  }

  changeTheme() {
    const body = document.querySelector("body");
    const svgMoon = document.querySelector("#svg-moon");
    const svgSun = document.querySelector("#svg-sun");
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      svgMoon.classList.remove("hidden");
      svgSun.classList.add("hidden");
      this.themeStorage.saveTheme("light");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      svgMoon.classList.add("hidden");
      svgSun.classList.remove("hidden");
      this.themeStorage.saveTheme("dark");
    }
  }

  setTheme(theme) {
    const body = document.querySelector("body");
    if (theme == "dark") {
      body.classList.replace("dark-theme", "light-theme");
      this.themeStorage.saveTheme("light");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      this.themeStorage.saveTheme("dark");
    }
  }

  addTask(content) {
    if (this.todoController.getAll().length == 0) {
      const section = document.querySelector(".list__output--disabled");
      section.classList.replace(
        "list__output--disabled",
        "list__output--abled"
      );
    }
    this.todoController.addTask(content);

    this.paintTasks(this.todoController.getAll());
  }

  deleteTask(event) {
    const task = event.currentTarget.closest("li");
    const idTask = task.getAttribute("data-id");
    const idxTask = this.todoController.findIndexById(idTask);
    this.todoController.deleteTask(idxTask);
    
    const ul = document.querySelector("ul");
    ul.removeChild(task);
    this.itemsLeft();
  }

  deleteAllCompleted() {

    this.todoController.deleteAllTasks((task) => task.isDone);
   
    const ul = document.querySelector("ul");
    const li = document.getElementsByTagName("li");
    let array = [...li].reverse();
    array.forEach((element) => {
      const liElement = element.childNodes[0].childNodes[0];
      const hasActiveMarker = liElement.classList.contains("marker-active");
      if (hasActiveMarker) {
        ul.removeChild(element);
      }
    });
  }

  toggleTask(event) {
    const task = event.currentTarget.closest("li");
    const idTask = task.getAttribute("data-id");
    const idxTask = this.todoController.findIndexById(idTask);
    this.todoController.checkTask(idxTask);
  
    
    const ul = document.querySelector("ul");
    const lis = ul.getElementsByTagName("li");
    const array = [...lis].reverse();
    const li = array[parseInt(idxTask)];
    const div = li.firstChild;
    const span = div.firstChild;
    const text = div.nextSibling;
    if (span.classList.contains("marker")) {
      span.classList.replace("marker", "marker-active");
      text.classList.add("text-crossed");
    } else {
      span.classList.replace("marker-active", "marker");
      text.classList.remove("text-crossed");
    }
    this.itemsLeft();
  }

  showTasks() {
    const radioButtons = [
      ...document.querySelectorAll('input[name="categories"]'),
    ];
    for (let i = 0; i < radioButtons.length; i++) {
      const rb = radioButtons[i];
      const value = rb.value;
      const isChecked = !!rb.checked;
      if (isChecked) {
        if (value === "all") {
          this.paintTasks(this.todoController.getAll());
          this.paintCategories(value);
        } else if (value === "active") {
          this.paintTasks(this.todoController.getActiveTasks());
          this.paintCategories(value);
        } else if (value === "completed") {
          this.paintTasks(this.todoController.getCompletedTasks());
          this.paintCategories(value);
        }
      }
    }
  }

  paintTasks(tasks) {
    this.deleteAllChilds("ul");
    tasks.forEach((task) => {
      const idTask = task.id;
      const ul = document.querySelector("ul");
      const li = document.createElement("li");
      const isTaskDone = task.isDone;

      li.classList.add("list__item");
      li.classList.add("flex");
      li.setAttribute("data-id", idTask);

      
      //Draggable
      li.setAttribute("draggable",true);

      const div = document.createElement("div");
      div.classList.add("checkbox");

      const spanMarker = document.createElement("span");
      const spanText = document.createElement("span");

      if (isTaskDone) {
        spanMarker.classList.add("marker-active");
        spanText.classList.add("text-crossed");
      } else {
        spanMarker.classList.add("marker");
      }

      spanText.classList.add("text");
      spanText.textContent = task.content;

      const spanCheckmark = document.createElement("span");
      spanCheckmark.classList.add("checkmark");

      //deletetask
      //EventListener
      spanCheckmark.addEventListener("click", this.deleteTask.bind(this));

      ul.insertAdjacentElement("afterbegin", li);
      li.append(div, spanText, spanCheckmark);
      div.appendChild(spanMarker);

      spanMarker.onclick = this.toggleTask.bind(this);
      this.itemsLeft();
    });
  }

  // Utility Functions
  itemsLeft() {
    const itemsLeft = document.querySelector(".list__bottom--items");
    const num = this.todoController
      .getAll()
      .filter((task) => !task.isDone).length;
    itemsLeft.textContent = `${num} items left`;
  }

  deleteAllChilds(selector) {
    const node = document.querySelector(selector);
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  paintCategories(value) {
    const labels = [...document.querySelectorAll("label")];
    let currentPosition;
    if (value === "active") {
      currentPosition = 1;
    } else if (value === "completed") {
      currentPosition = 2;
    } else {
      currentPosition = 0;
    }
    const chosenLabel = labels[currentPosition];
    const chosenLabelArray = Array(labels[currentPosition]);
    const remainingLabels = labels.filter(
      (label) => !chosenLabelArray.includes(label)
    );
    this.unpaintCategories(remainingLabels);
    chosenLabel.classList.add("list__categories--chosen");
  }
  unpaintCategories(remainingLabels) {
    for (let i = 0; i < remainingLabels.length; i++) {
      if (remainingLabels[i].classList.contains("list__categories--chosen")) {
        remainingLabels[i].classList.remove("list__categories--chosen");
      }
    }
  }
}
