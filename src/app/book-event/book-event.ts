import { Component } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { IBookEvent } from '../model/createEvent.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-event',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './book-event.html',
  styleUrl: './book-event.css'
})
export class BookEvent {
 

  constructor(private bookEventService:BookEventservice){}

  events:IBookEvent[]=[]
  getEvents(){
    this.bookEventService.getBookEvents().subscribe(response=>{
      this.events=(response.data)
    })
  }



}
