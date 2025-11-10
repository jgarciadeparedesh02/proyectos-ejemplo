import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent {
  @Input() tasks!: { name: string; completed: boolean }[];
  @Output() removeTask = new EventEmitter<number>();
  @Output() toggleComplete = new EventEmitter<number>();

  onRemove(index: number) {
    this.removeTask.emit(index);
  }

  onToggle(index: number) {
    this.toggleComplete.emit(index);
  }
}
