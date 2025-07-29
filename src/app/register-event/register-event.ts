import { Component } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-event',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css'
})
export class RegisterEvent {
bookingForm=new FormGroup({
  bookId:new FormControl(''),
  eventId:new FormControl(''),
  userId:new FormControl(''),
  eventdt:new FormControl('')
 })
  successMessage: any;
 constructor(private bookEventService:BookEventservice){}
submitBooking(): void {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;
      this.bookEventService.createBooking(bookingData).subscribe(
        (response) => {
          console.log('Booking created successfully:', response);
        },
        (error) => {
          console.error('Error creating booking:', error);
        }
      );
    }
  }


}
