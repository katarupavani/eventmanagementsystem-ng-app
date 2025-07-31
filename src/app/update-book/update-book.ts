import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookEventservice } from '../service/book-eventservice';
import { IBookEvent } from '../model/createEvent.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-book',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './update-book.html',
  styleUrls: ['./update-book.css']
})
export class UpdateBookComponent implements OnInit {
  bookingForm: FormGroup;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  bookingId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookEventservice
  ) {
    this.bookingForm = this.fb.group({
      userId: ['', Validators.required],
      eventId: ['', Validators.required],
     // eventdt: [''] // Optional date
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.bookingId = idParam ? Number(idParam) : 0;

    if (this.bookingId > 0) {
      this.bookService.getBookingId(this.bookingId).subscribe(
        (booking: IBookEvent) => {
          this.bookingForm.patchValue({
            userId: booking.userId,
            eventId: booking.eventId,
            eventdt: booking.eventdt || ''
          });
          this.isEditMode = true;
        },
        error => {
          this.errorMessage = 'Error fetching booking details.';
          console.error('Fetch error:', error);
        }
      );
    }
  }

  submitBooking(): void {
  if (this.bookingForm.valid) {
    const bookingData = this.bookingForm.value;

    if (this.isEditMode && this.bookingId > 0) {
      this.bookService.updateBooking(this.bookingId, bookingData).subscribe(
        (response: any) => {
          // Expecting: { status: 'success', message: '...', data: {...} }
          if (response.status === 'success') {
            this.successMessage = response.message || 'Booking updated successfully!';
            this.errorMessage = '';
          } else {
            this.errorMessage = response.message || 'Update failed.';
            this.successMessage = '';
          }
        },
        (error) => {
          this.errorMessage = 'Failed to update booking.';
          this.successMessage = '';
          console.error('Update error:', error);
        }
      );
    } else {
      this.errorMessage = 'Invalid booking ID.';
    }
  } else {
    this.errorMessage = 'Please fill out all required fields.';
  }
}

goBack(){
  location.href=""
}
}
