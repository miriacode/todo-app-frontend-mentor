class Task {
  constructor(id, content) {
    this.id = id;
    this.content = content;
    this.isDone = false;
  }

  check() {
    this.isDone = !this.isDone;
  }
  static copyFrom(task) {
    const clone = new Task(task.id, task.content);
    clone.isDone = task.isDone;
    return clone;
  }
}
