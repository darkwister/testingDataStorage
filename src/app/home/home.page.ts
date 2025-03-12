import { Component, OnInit} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Task } from '../class/task';
import { TaskManagerService } from '../services/task-manager.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [FormsModule,CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle],
})
export class HomePage {
  taskSelected?: Task;
  taskName?: string;
  taskDescription?: string; 
  taskStatus?: boolean;

  tasks: Task[] = [];

  constructor(private taskService: TaskManagerService) {}
  async ngOnInit(){
    console.log(this.tasks);
    this.tasks = await this.taskService.getTasks();
  }
  
  selectTask(task: Task){
    if(!task) return;
    this.taskSelected = task;
    this.taskName = task.title;
    this.taskDescription = task.description;
  }
  async addTask(taskName: string, taskDescription: string){
    if (!taskName || !taskDescription) {
      alert('Error: Los campos no pueden estar vacíos');
      return;
    }
    await this.taskService.addTask(taskName, taskDescription);
    this.tasks = await this.taskService.getTasks();
    this.taskName = '';
    this.taskDescription = '';
  }

  async deleteTask(id: number){
    if(!id){
      alert('Debe elegir almenos un elemento');
      return;
    }
    await this.taskService.deleteTask(id);
    this.tasks = await this.taskService.getTasks();
    this.taskName = '';
    this.taskDescription = '';
  }

  async editTask(id: number, title: string, description: string){
    if (!title || !description) {
      alert('Error: Los campos no pueden estar vacíos');
      return;
    }
    else if(!id){
      alert('Debe elegir almenos un elemento');
      return;
    }
    await this.taskService.updateTask(id, title, description);
    this.tasks = await this.taskService.getTasks();
    alert('Tarea actualizada');
    this.taskName = '';
    this.taskDescription = '';
  }
}
