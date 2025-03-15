import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component';
import { Todo } from './types/todo';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodosService } from './services/todos.service';
import { MessageComponent } from './components/message/message.component';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodoComponent, TodoFormComponent, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private _todos: Todo[] = [];
  activeTodos: Todo[] = [];
  errorMessage = '';

  get todos() {
    return this._todos;
  }

  set todos(todos: Todo[]) {
    if (todos === this._todos) {
      return;
    }

    this._todos = todos;
    this.activeTodos = this._todos.filter((todo) => !todo.completed);
  }

  constructor(
    private todosServices: TodosService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.todosServices.todos$.subscribe((todos) => {
      this.todos = todos;
    });

    this.todosServices.loadTodos().subscribe({
      error: () => {
        this.messageService.showMessage('Unable to load todos')
      },
    });
  }

  trackById(i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(newTitle: string) {
    this.todosServices.createTodo(newTitle).subscribe({
      error: () => {
        this.messageService.showMessage('Unable to load todos')
      },
    });
  }

  toggleTodo(todo: Todo) {
    this.todosServices
      .updateTodo({ ...todo, completed: !todo.completed })
      .subscribe({
        error: () => {
          this.messageService.showMessage('Unable to load todos')
        },
      });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosServices.updateTodo({ ...todo, title }).subscribe({
      error: () => {
        this.messageService.showMessage('Unable to load todos')
      },
    });
  }

  deleteTodo(todo: Todo) {
    this.todosServices.deleteTodo(todo).subscribe({
      error: () => {
        this.messageService.showMessage('Unable to load todos')
      },
    });
  }
}
