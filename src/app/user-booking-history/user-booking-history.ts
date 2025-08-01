import { Component } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-booking-history',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-booking-history.html',
  styleUrls: ['./user-booking-history.css']
})
export class UserBookingHistory {
  username: string = '';         // Input field (instead of userId)
  bookings: any[] = [];
  message: string = '';
  error: boolean = false;

  constructor(private bookingService: BookEventservice) {}

  fetchBookings(): void {
    if (!this.username.trim()) {
      this.message = 'Please enter a valid username.';
      this.error = true;
      return;
    }

    // Step 1: Fetch userId by username
    this.bookingService.getBookingsByUsername(this.username).subscribe({
      next: (userResponse: any) => {
        const userId = userResponse?.data?.userId;
        if (!userId) {
          this.message = 'User not found.';
          this.error = true;
          return;
        }

        // Step 2: Fetch bookings by userId
        this.bookingService.getBookingsByUserId(userId).subscribe({
          next: (bookingResponse: any) => {
            if (bookingResponse.status === 'success') {
              this.bookings = bookingResponse.data;
              this.message = bookingResponse.message;
              this.error = false;
            } else {
              this.bookings = [];
              this.message = bookingResponse.message;
              this.error = true;
            }
          },
          error: (err: any) => {
            this.message = 'Failed to fetch bookings. ' + err.message;
            this.error = true;
          }
        });
      },
      error: (err: any) => {
        this.message = 'Failed to fetch user ID. ' + err.message;
        this.error = true;
      }
    });
  }
}
