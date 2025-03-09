import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../../types/todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Output()
  delete = new EventEmitter<void>();

  @Input()
  todo!: Todo;

  @ViewChild('titleField')
  set titleField(field: ElementRef){
    if(field){
      field.nativeElement.focus()
    }
  }

  editing = false;

}
