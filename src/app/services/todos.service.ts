import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API} from '../constants/constants';
import { Todo } from '../types/todo';



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private http: HttpClient,
  ) { }

  getTodos(){
    return this.http.get<Todo[]>(`${API.url}/todos?userId=${API.userId}`)
  }
}
