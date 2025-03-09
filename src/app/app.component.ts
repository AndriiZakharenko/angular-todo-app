import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

const todos = [
  { id: 1, title: 'HTML', completed: true },
  { id: 2, title: 'CSS', completed: true },
  { id: 3, title: 'JS', completed: false },
  { id: 4, title: 'React', completed: false },
  { id: 5, title: 'Vue', completed: false },
  { id: 6, title: 'Angular', completed: false },
];

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  editing = false;
  todos = todos;

  handleTodoToggle(event: Event, todo: Todo){
    todo.completed = (event.target as HTMLInputElement).checked
  }
}
