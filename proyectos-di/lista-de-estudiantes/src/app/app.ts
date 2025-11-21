import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Student {
  name: string;
  age: number;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  students: Student[] = [];
  newStudentName = '';
  newStudentAge = 18;

  addStudent() {
    if (this.newStudentName && this.newStudentAge > 0) {
      this.students.push({ name: this.newStudentName, age: this.newStudentAge });
      this.newStudentName = '';
      this.newStudentAge = 18;
    }
  }
}