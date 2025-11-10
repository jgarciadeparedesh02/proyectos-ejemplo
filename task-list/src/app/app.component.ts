import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInputComponent } from './task-input/task-input';
import { TaskListComponent } from './task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskInputComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: { name: string; completed: boolean }[] = [
    { name: 'Crear el proyecto', completed: true },
    { name: 'Crear los componentes', completed: false },
    { name: 'Añadir estilos', completed: false }
  ];

  onAddTask(newTask: string) {
    this.tasks.push({ name: newTask, completed: false });
  }

  onRemoveTask(index: number) {
    this.tasks.splice(index, 1);
  }

  onToggleComplete(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
  }
}