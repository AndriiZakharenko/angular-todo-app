import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  editing = false;
  todos = todos;
  title = "";

  get activeTodos(){
    return this.todos.filter(todo => !todo.completed)
  }

  addTodo(){
    if(!this.title){
      return
    }
    
    const newTodo: Todo = {
      id: Date.now(),
      title: this.title,
      completed: false
    }

    this.todos.push(newTodo)
    this.title = ""
  }
}
