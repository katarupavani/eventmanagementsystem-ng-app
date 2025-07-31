import { Component } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBookEvent } from '../model/createEvent.model';

@Component({
  selector: 'app-register-event',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css'
})
export class RegisterEvent {

  bookingForm = new FormGroup({
    eventId: new FormControl(''),
    userId: new FormControl(''),
    eventdt: new FormControl('')
  });

  successMessage: string | null = null;
  createdBookingId: number | null = null;
  errorMessage: null | null=null;

  constructor(private bookEventService: BookEventservice) {}
submitBooking(): void {
  this.successMessage = null;
  this.errorMessage = null;



  if (this.bookingForm.valid) {
    const bookingData = this.bookingForm.value;

    this.bookEventService.createBooking(bookingData).subscribe(
      (response: any) => {
        console.log('Raw response:', response);

        if (response?.status === 'success') {
          const createdBooking = response.data;
          if (createdBooking?.bookId) {
            this.createdBookingId = createdBooking.bookId;
            this.successMessage = `Booking successful! ID: ${this.createdBookingId}`;
          } else {
            this.successMessage = 'Booking created, but no booking ID received.';
          }
        } else if (response?.status === 'error') {
          this.errorMessage = response.message || 'Booking failed.';
        }
      },
      (error) => {
        console.error('Error creating booking:', error);
        this.errorMessage = error?.error?.message || 'Booking failed. Please try again.';
      }
    );
  }
}
goBack(): void {
  location.href="" // change '/events' to your actual route
}
}
