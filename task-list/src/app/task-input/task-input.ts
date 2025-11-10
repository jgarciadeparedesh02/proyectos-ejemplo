import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-input.html',
  styleUrls: ['./task-input.css'],
})
export class TaskInputComponent {
  newTask = '';
  @Output() addTask = new EventEmitter<string>();

  onSubmit() {
    if (this.newTask.trim()) {
      this.addTask.emit(this.newTask);
      this.newTask = '';
    }
  }
}
