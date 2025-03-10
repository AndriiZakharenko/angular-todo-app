import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from "./components/todo-form/todo-form.component";
import { todosFromServer } from './data/todosFromServer';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodoComponent, TodoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  todos = todosFromServer;

  get activeTodos() {
    return this.todos.filter((todo) => !todo.completed);
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
