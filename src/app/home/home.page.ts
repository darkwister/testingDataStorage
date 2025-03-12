import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { Task } from '../class/task';
import { TaskManagerService } from '../services/task-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton],
})
export class HomePage {
  taskSelected?: Task;
  taskName?: string;
  taskDescription?: string; 
  taskStatus?: boolean;

  tasks: Task[] = []
  constructor(private taskService: TaskManagerService) {}
  async ngOnInit(){
    this.tasks = await this.taskService.getTasks();
  }

  async addTask(){
    if (!this.taskName || !this.taskDescription) {
      alert('Error: Los campos no pueden estar vacíos');
      return;
    }
    await this.taskService.addTask(this.taskName, this.taskDescription);
    this.tasks = await this.taskService.getTasks();
  }

  async deleteTask(id: number){
    if(!id){
      alert('Debe elegir almenos un elemento');
      return;
    }
    await this.taskService.deleteTask(id);
    this.tasks = await this.taskService.getTasks();
  }

  async editTask(id:number){
    if (!this.taskName || !this.taskDescription) {
      alert('Error: Los campos no pueden estar vacíos');
      return;
    }
    await this.taskService.updateTask(id, this.taskName, this.taskDescription);
    this.tasks = await this.taskService.getTasks();
  }
}
