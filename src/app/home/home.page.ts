import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/angular/standalone';
import { Task } from '../task';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput],
})
export class HomePage {
  taskName?: string;
  taskDescription?: string; 
  taskStatus?: boolean;

  tasks: Task[] = []
  constructor(private taskService: TaskManagerService) {}
  async ngOnInit(){
    this.tasks = await this.taskService.getTasks();
  }

  async addTask(name: string, desc: string){
    await this.taskService.addTask(name, desc);
    this.tasks = await this.taskService.getTasks();
  }

  async deleteTask(id: number){
    await this.taskService.deleteTask(id);
    this.tasks = await this.taskService.getTasks();
  }

  async editTask(id:number, name: string, desc: string){
    await this.taskService.updateTask(id, name, desc);
    this.tasks = await this.taskService.getTasks();
  }
}
