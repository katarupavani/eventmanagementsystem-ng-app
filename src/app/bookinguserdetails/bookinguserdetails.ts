import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventService } from '../service/eventservice';
import { IBookEvent } from '../model/createEvent.model';
import { User } from "../user/user";

@Component({
  selector: 'app-bookingdetailsuser',
  imports: [FormsModule, CommonModule, User],
  templateUrl: './bookinguserdetails.html',
  styleUrl: './bookinguserdetails.css'
})
export class Bookingdetailsuser  implements OnInit {
  bookings: IBookEvent[] = [];
  message: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      const userId = Number(userIdStr);
      this.eventService.getBookingHistoryByUserId(userId).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.bookings = response.data;
            if (this.bookings.length === 0) {
              this.message = 'No bookings found.';
            }
          } else {
            this.message = response.message || 'Failed to load bookings.';
          }
        },
        error: (err) => {
          console.error('Error fetching bookings:', err);
          this.message = 'An error occurred while loading bookings.';
        }
      });
    } else {
      this.message = 'User is not logged in.';
    }
  }
      
  }