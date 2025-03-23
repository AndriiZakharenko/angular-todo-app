import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { MessageService } from '../../services/message.service';
import { Todo } from '../../types/todo';
import { Status } from '../../types/status';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { TodoComponent } from '../../components/todo/todo.component';
import { MessageComponent } from '../../components/message/message.component';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TodoFormComponent, TodoComponent, MessageComponent],
})
export class TodosPageComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  activeTodos$!: Observable<Todo[]>;
  completedTodos$!: Observable<Todo[]>;
  activeCount$!: Observable<number>;
  visibleTodos$!: Observable<Todo[]>;

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$;

    this.activeTodos$ = this.todos$.pipe(
      distinctUntilChanged(),
      map(todos => todos.filter(todo => !todo.completed))
    );

    this.completedTodos$ = this.todos$.pipe(
      map(todos => todos.filter(todo => todo.completed))
    );

    this.activeCount$ = this.activeTodos$.pipe(
      map(todos => todos.length)
    );

    this.visibleTodos$ = this.route.params.pipe(
      switchMap(params => {
        switch (params['status'] as Status) {
          case 'active':
            return this.activeTodos$;
          case 'completed':
            return this.completedTodos$;
          default:
            return this.todos$;
        }
      })
    );

    this.todosService.loadTodos().subscribe({
      error: () => this.messageService.showMessage('Unable to load todos'),
    });
  }

  trackById = (i: number, todo: Todo) => todo.id;

  addTodo(newTitle: string) {
    this.todosService.createTodo(newTitle).subscribe({
      error: () => this.messageService.showMessage('Unable to add a todo'),
    });
  }

  toggleTodo(todo: Todo) {
    this.todosService.updateTodo({ ...todo, completed: !todo.completed }).subscribe({
      error: () => this.messageService.showMessage('Unable to toggle a todo'),
    });
  }

  renameTodo(todo: Todo, title: string) {
    this.todosService.updateTodo({ ...todo, title }).subscribe({
      error: () => this.messageService.showMessage('Unable to rename a todo'),
    });
  }

  deleteTodo(todo: Todo) {
    this.todosService.deleteTodo(todo).subscribe({
      error: () => this.messageService.showMessage('Unable to delete a todo'),
    });
  }
}
