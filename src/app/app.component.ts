import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { todosFromServer } from './data/todosFromServer';
import { FilterActivePipe } from './pipes/filter-active.pipe';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodoComponent, TodoFormComponent, FilterActivePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  _todos: Todo[] = [];
  activeTodos: Todo[] = []

  get todos(){
    return this._todos
  }

  set todos(todos: Todo[]){
    if(todos === this._todos){
      return
    }

    this._todos = todos
    this.activeTodos = this._todos.filter((todo) => !todo.completed)
  }

  constructor(){}
  ngOnInit(): void {
    this.todos = todosFromServer
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string){
    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };

    this.todos = [ ...this.todos, newTodo ];
  }

  toggleTodo(todoId: number){
    this.todos = this.todos.map(todo => {
      if(todo.id !== todoId){
        return todo
      }

      return { ... todo, completed: !todo.completed }
    })
  }

  renameTodo(todoId: number, title: string){
    this.todos = this.todos.map(todo => {
      if(todo.id !== todoId){
        return todo
      }

      return { ... todo, title }
    })
  }

  deleteTodo(todoId: number){
    this.todos = this.todos.filter(todo => todo.id !== todoId)

  }

}
