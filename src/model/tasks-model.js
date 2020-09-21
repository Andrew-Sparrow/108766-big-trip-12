import Observer from "../utils/observer.js";

export default class TasksModel extends Observer {
  constructor() {
    super();
    this._tasks = [];
  }

  setTasks(tasks) {
    this._tasks = tasks.slice();
  }

  getTasks() {
    return this._tasks;
  }
}
