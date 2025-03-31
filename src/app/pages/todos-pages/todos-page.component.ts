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
import { FilterComponent } from "../../components/filter/filter.component";

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, TodoFormComponent, TodoComponent, MessageComponent, FilterComponent],
})
export class TodosPageComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  activeTodos$!: Observable<Todo[]>;
  completedTodos$!: Observable<Todo[]>;
  activeCount$!: Observable<number>;
  visibleTodos$!: Observable<Todo[]>;
  showTodos = true;

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$;
  
    this.activeTodos$ = this.todos$.pipe(
      map(todos => todos.filter(todo => !todo.completed))
    );
  
    this.completedTodos$ = this.todos$.pipe(
      map(todos => todos.filter(todo => todo.completed))
    );
  
    this.activeCount$ = this.activeTodos$.pipe(
      map(todos => todos.length)
    );
  
    this.visibleTodos$ = this.route.paramMap.pipe(
      map(params => {
        const status = params.get('status') as Status;
        switch (status) {
          case 'active':
            return this.activeTodos$;
          case 'completed':
            return this.completedTodos$;
          default:
            return this.todos$;
        }
      }),
      switchMap(todos => todos)
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

  toggleTodosVisibility() {
    this.showTodos = !this.showTodos;
  }
}
