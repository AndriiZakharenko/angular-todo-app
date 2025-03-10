import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoComponent } from "./components/todo/todo.component";
import { Todo } from './types/todo';

const todos = [
  { id: 1, title: 'HTML', completed: true },
  { id: 2, title: 'CSS', completed: true },
  { id: 3, title: 'JS', completed: false },
  { id: 4, title: 'React', completed: false },
  { id: 5, title: 'Vue', completed: false },
  { id: 6, title: 'Angular', completed: false },
];
@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    })
  })

  get title(){
    return this.todoForm.get('title') as FormControl
  }

  get activeTodos(){
    return this.todos.filter(todo => !todo.completed)
  }

  constructor(){}
  ngOnInit(): void {
    setTimeout(() => {
      this.todos[1] = { ...this.todos[1], title: "qwerty" }
    }, 3000)
  }

  trackById(i: number, todo: Todo){
    return todo.id
  }

  addTodo(){
    if(this.todoForm.invalid){
      return
    }
    
    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value,
      completed: false
    }

    this.todos.push(newTodo)
    this.todoForm.reset()
  }
}
