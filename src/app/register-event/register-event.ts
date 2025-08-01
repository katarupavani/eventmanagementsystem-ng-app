import { Component, OnInit } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-event',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css'
})
export class RegisterEvent implements OnInit {
  events: { eventId: number; eventName: string }[] = [];
  successMessage: string | null = null;
  createdBookingId: number | null = null;
  errorMessage: string | null = null;

  bookingForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    eventName: new FormControl<string>('', Validators.required)
  });

  constructor(private bookEventService: BookEventservice) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.bookEventService.getAllEvents().subscribe({
      next: response => {
        this.events = response.data || [];
      },
      error: err => {
        console.error('Failed to load events:', err);
        this.errorMessage = 'Could not load events.';
      }
    });
  }

  submitBooking(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.bookingForm.valid) {
      const bookingData = {
        username: this.bookingForm.value.username!,
        eventName: this.bookingForm.value.eventName!
      };

      this.bookEventService.createBookingByName(bookingData).subscribe({
        next: (response: any) => {
          if (response?.status === 'success') {
            const createdBooking = response.data;
            this.createdBookingId = createdBooking?.bookId || null;
            this.successMessage = `Booking successful! ID: ${this.createdBookingId}`;
          } else {
            this.errorMessage = response.message || 'Booking failed.';
          }
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          this.errorMessage = error?.error?.message || 'Booking failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  goBack(): void {
    window.location.href = "/getbyevent";
  }
}
