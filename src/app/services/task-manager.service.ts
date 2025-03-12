import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Task } from '../class/task';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  private _storage: Storage | null = null;
  private tasks: Task[] = [];

  constructor(private storage: Storage) {
    this.init(); 
  }

  async init() {
    this._storage = await this.storage.create();
    if (!this._storage) {
      console.error('Error: Storage no se inicializó correctamente');
      return;
    }
    await this.loadTasks();
  }

  private async loadTasks() {
    if (!this._storage) await this.init();
    const storedTasks = await this._storage?.get('tasks');
    this.tasks = storedTasks ? storedTasks.map((t: any) => new Task(t.id, t.title, t.description, t.completed)) : [];
  }

  async getTasks(): Promise<Task[]> {
    if (!this._storage) await this.init();
    await this.loadTasks();
    return this.tasks;
  }

  async addTask(title: string, description: string){
    if (!this._storage) await this.init();
    const newTask = new Task(this.tasks.length + 1, title, description);
    this.tasks.push(newTask);
    await this._storage?.set('tasks', this.tasks);
  }

  async updateTask(id: number, title: string, description: string){
    if (!this._storage) await this.init();
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.title = title;
      task.description = description;
      await this._storage?.set('tasks', this.tasks);
    }
  }

  async deleteTask(id: number){
    if (!this._storage) await this.init();
    this.tasks = this.tasks.filter((t) => t.id !== id);
    await this._storage?.set('tasks', this.tasks);
  }
}
