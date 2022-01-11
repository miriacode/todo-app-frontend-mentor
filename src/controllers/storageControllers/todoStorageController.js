class ToDoStorageController {
  constructor(key) {
    this.myStorage = window.localStorage;
    this.key = key;
  }

  saveTasks(tasks) {
    this.myStorage.removeItem(this.key);
    const stringifiedTasks = JSON.stringify(tasks);
    this.myStorage.setItem(this.key, stringifiedTasks);
  }

  getTasks() {
    const stringifiedTasks = this.myStorage.getItem(this.key);
    const parsedTasks = JSON.parse(stringifiedTasks);
    
    if(parsedTasks && parsedTasks.length){
      return parsedTasks.map(Task.copyFrom);
    }else{
      return new Array()
    }
  }
}
