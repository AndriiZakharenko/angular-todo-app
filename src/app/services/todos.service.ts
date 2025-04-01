import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/constants';
import { Todo } from '../types/todo';
import { BehaviorSubject, tap, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private todos$$ = new BehaviorSubject<Todo[]>([]);

  todos$ = this.todos$$.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  loadTodos() {
    return this.http.get<Todo[]>(`${API.url}/todos?userId=${API.userId}`)
      .pipe(
        tap(todos => {
          this.todos$$.next(todos)
        }),
      );
  }

  createTodo(title: string) {
    return this.http.post<Todo>(`${API.url}/todos`, {
      title,
      userId: API.userId,
      completed: false,
    })
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([createdTodo, todos]) => {
          this.todos$$.next(
            [...todos, createdTodo]
          );
        }),
      )
  }

  updateTodo({ id, ...data }: Todo) {
    return this.http.patch<Todo>(`${API.url}/todos/${id}`, data)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([updatedTodo, todos]) => {
          this.todos$$.next(
            todos.map(todo => todo.id === id ? updatedTodo : todo)
          );
        }),
      )
  }

  deleteTodo({ id }: Todo) {
    return this.http.delete<Todo>(`${API.url}/todos/${id}`)
      .pipe(
        withLatestFrom(this.todos$$),
        tap(([_, todos]) => {
          this.todos$$.next(
            todos.filter(todo => todo.id !== id),
          );
        }),
      )
  }

  clearAllTodos() {
    return this.http.delete(`${API.url}/todos?userId=${API.userId}`)
      .pipe(
        tap(() => {
          this.todos$$.next([]);
        }),
      );
  }
}
