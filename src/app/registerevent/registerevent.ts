import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookEvent } from '../model/registerevent.model';
import { RegisterService } from '../service/register-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registerevent',
  imports: [FormsModule,CommonModule],
  templateUrl: './registerevent.html',
  styleUrl: './registerevent.css'
})
export class Registerevent {

 booking: BookEvent = {
    bookId: 0,
    userId: 0,
    username: '',
    eventId: 0,
    eventName: '',
    eventdt: ''
  };

constructor(private registereventservice: RegisterService, private router: Router) {}

onSubmit() {
    
}


}
