document.addEventListener("DOMContentLoaded", () => {
  const todoView = new ToDoView(new ToDoListController());
  const inputTask = document.querySelector("#input");
  const formInputTask = document.querySelector("#formNewTask");
  const button = document.querySelector(".header__button");

  //Para evitar el submit
  formInputTask.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  //SetTheme
  //
  const color = todoView.getTheme();
  todoView.setTheme(color);
  todoView.changeTheme();

  // Event Listeners

  //button light&dark
  button.addEventListener("click", () => {
    todoView.changeTheme();
  });

  // addTask
  inputTask.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      const content = inputTask.value;
      todoView.addTask(content);
      inputTask.value = "";
    }
  });

  // showTasks
  const form = document.querySelector(".list__categories");
  form.addEventListener("change", todoView.showTasks.bind(todoView));

  // deleteAll
  const btnDeleteAll = document.querySelector(".list__bottom--clear");
  btnDeleteAll.addEventListener(
    "click",
    todoView.deleteAllCompleted.bind(todoView)
  );

  //Draggable
  const ul = document.querySelector(".ul");

  //This shows which li we have started dragging
  ul.addEventListener("dragstart", (eventDragChildren) => {
    const idTask = eventDragChildren.target.attributes[1].value;
    const idxTask = todoView.todoController.findIndexById(idTask);
    eventDragChildren.dataTransfer.setData("id", idxTask);
  });

  //In the moment
  ul.addEventListener("dragover", (eventDragOver) => {
    eventDragOver.preventDefault();
  });

  //This shows where we have droppped the li
  ul.addEventListener("drop", (eventDropChildren) => {
    const idTaskD = eventDropChildren.target.parentNode.attributes[1].value;
    const idxTaskD = todoView.todoController.findIndexById(idTaskD);
    const id = eventDropChildren.dataTransfer.getData("id");
    todoView.todoController.reorderTaskList(id, idxTaskD);
    todoView.paintTasks(todoView.todoController.taskList);
  });
});
