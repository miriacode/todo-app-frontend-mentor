class ToDoListController {

  constructor() {
    this.todoStorage = new ToDoStorageController("front-mentor-todoapp");
    this.idCounter = 1;
    this.taskList = this.todoStorage.getTasks(); //Data Base
    this.#setInitialIdCounter();
  }

  #setInitialIdCounter() {
    if (this.taskList.length) {
      const orderedTasks = [...this.taskList].sort((a, b) => {
        return b.id - a.id;
      });
      this.idCounter = orderedTasks[0].id + 1;
    }
  }

  addTask(content) {
    const task = new Task(this.idCounter++, content);
    this.taskList.push(task);
    this.todoStorage.saveTasks(this.taskList);
    return task.id;
  }

  deleteTask(index) {
    this.taskList.splice(index, 1);
    this.todoStorage.saveTasks(this.taskList);
  }

  checkTask(index) {
    const task = this.taskList[index];
    task.check();
    this.todoStorage.saveTasks(this.taskList);
  }

  deleteAllTasks(condition) {
    if (condition && typeof condition === "function") {
      this.taskList = this.taskList.filter((task) => !condition(task));
    } else {
      this.taskList = [];
    }
    this.todoStorage.saveTasks(this.taskList);
  }

  getAll() {
    return this.taskList;
  }

  getActiveTasks() {
    return this.taskList.filter((task) => !task.isDone);
  }

  getCompletedTasks() {
    return this.taskList.filter((task) => task.isDone);
  }

  getTaskByIndex(index) {
    return this.taskList[index];
  }

  findIndexById(id) {
    return this.taskList.findIndex((task) => task.id === parseInt(id));
  }

  // Draggable
  reorderTaskList(startPosition, endPosition) {
    const movedTask = this.taskList[startPosition];
    const croppedTask = this.taskList.splice(startPosition, 1);
    const newTaskList = this.taskList.splice(endPosition, 0, movedTask);

    // To save
    this.todoStorage.saveTasks(this.taskList);
  }
}
