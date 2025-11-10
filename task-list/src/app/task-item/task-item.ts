import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.css']
})
export class TaskItemComponent {
  @Input() task!: { name: string; completed: boolean };
  @Output() removeTask = new EventEmitter<void>();
  @Output() toggleComplete = new EventEmitter<void>();

  onRemove() {
    this.removeTask.emit();
  }

  onToggle() {
    this.toggleComplete.emit();
  }
}
