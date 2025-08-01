import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookEventservice } from '../service/book-eventservice';
import { IBookEvent, IEvent } from '../model/createEvent.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-book.html',
  styleUrls: ['./update-book.css']
})
export class UpdateBookComponent implements OnInit {
  bookingForm: FormGroup;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  bookingId!: number;
  events: IEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookEventservice
  ) {
    this.bookingForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],  // changed
      eventId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.bookingId = idParam ? Number(idParam) : 0;

    this.loadEvents();

    if (this.bookingId > 0) {
      this.isEditMode = true;
      this.bookService.getBookingId(this.bookingId).subscribe(
        (booking: IBookEvent) => {
          if (booking && booking.user && booking.event) {
            this.bookingForm.patchValue({
              username: booking.user.username,
              eventId: booking.event.eventId
            });
          } else {
            this.errorMessage = 'Invalid booking data received.';
          }
        },
        error => {
          this.errorMessage = 'Error fetching booking details.';
          console.error('Booking fetch error:', error);
        }
      );
    } else {
      this.errorMessage = 'Invalid booking ID.';
    }
  }

  loadEvents(): void {
    this.bookService.getEvents().subscribe(
      (eventList: IEvent[]) => {
        this.events = eventList;
      },
      error => {
        this.errorMessage = 'Failed to load events.';
        console.error('Event fetch error:', error);
      }
    );
  }

  submitBooking(): void {
    if (this.bookingForm.valid) {
      const formValues = this.bookingForm.getRawValue();

      if (this.isEditMode && this.bookingId > 0) {
        const updatePayload = {
          username: formValues.username,
          eventId: formValues.eventId
        };

        this.bookService.updateBooking(this.bookingId, updatePayload).subscribe(
          (response: any) => {
            if (response.status === 'success') {
              this.successMessage = response.message || 'Booking updated successfully!';
              this.errorMessage = '';
            } else {
              this.errorMessage = response.message || 'Update failed.';
              this.successMessage = '';
            }
          },
          error => {
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

  goBack(): void {
    window.location.href = '/getbyevent';
  }
}
