import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private _storage: Storage | null = null;
  private tasks: Task[] = [];

  constructor(private storage: Storage) {

    this.init()
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadTasks();
  }
  private async loadTasks() {
    const storedTasks = await this._storage?.get('tasks');
    this.tasks = storedTasks ? storedTasks.map((t: any) => new Task(t.id, t.title, t.description, t.completed)) : [];
  }

  async getTasks(): Promise<Task[]> {
    await this.loadTasks();
    return this.tasks;
  }

  async addTask(title: string, description: string){
    const newTask = new Task(this.tasks.length + 1, title, description);
    this.tasks.push(newTask);
    await this._storage?.set('tasks', this.tasks);
  }

  async updateTask(id: number, title: string, description: string){
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.title = title;
      task.description = description;
      await this._storage?.set('tasks', this.tasks);
    }
  }

  async deleteTask(id: number){
    this.tasks = this.tasks.filter((t) => t.id !== id);
    await this._storage?.set('tasks', this.tasks);
  }
}
