import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/constants';
import { Todo } from '../types/todo';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  refresh$$ = new BehaviorSubject(null);
  todos$: Observable<Todo[]>;

  constructor(private http: HttpClient) {
    this.todos$ = this.refresh$$.pipe(switchMap(() => this.getTodos()));
  }

  getTodos() {
    return this.http.get<Todo[]>(`${API.url}/todos?userId=${API.userId}`);
  }

  createTodo(title: string) {
    return this.http
      .post<Todo>(`${API.url}/todos`, {
        title,
        userId: API.userId,
        completed: false,
      })
      .pipe(tap(() => this.refresh$$.next(null)));
    // .pipe(
    //   withLatestFrom(this.todos$$),
    //   tap(([createdTodo, todos]) => {
    //     this.todos$$.next(
    //       [...todos, createdTodo]
    //     );
    //   }),
    // )
  }

  updateTodo(todo: Todo) {
    return this.http.patch<Todo>(`${API.url}/todos/${todo.id}`, todo).pipe(
      tap(() => {
        this.refresh$$.next(null);
      })
    );
  }

  deleteTodo(todo: Todo) {
    return this.http.delete<Todo>(`${API.url}/todos/${todo.id}`).pipe(
      tap(() => {
        this.refresh$$.next(null);
      })
    );
  }
}
