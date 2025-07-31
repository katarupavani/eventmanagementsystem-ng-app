import { Component } from '@angular/core';
import { IBookEvent } from '../model/createEvent.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { BookEventservice } from '../service/book-eventservice';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './getbokingsbyid.html',  // Fixed typo in filename
  styleUrls: ['./getbokingsbyid.css']
})
export class ViewEventsComponent {
  events: { eventId: number; eventName: string }[] = [];
  bookings: IBookEvent[] = [];
  selectedEventId: number | null = null;
  selectedEventName: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private bookEventService: BookEventservice, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.bookEventService.getAllEvents().subscribe({
      next: (response) => {
        console.log("Events fetched:", response);
        this.events = response.data || [];
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error fetching events:', err);
        this.errorMessage = 'Failed to load events.';
        this.successMessage = '';
      }
    });
  }

  viewBookings(eventId: number, eventName: string): void {
    this.selectedEventId = eventId;
    this.selectedEventName = eventName;

    this.bookEventService.getBookingsByEventId(eventId).subscribe({
      next: (response) => {
        console.log(`Bookings for Event ${eventId}:`, response);
        this.bookings = response.data || [];
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
        this.errorMessage = `Failed to load bookings for Event ID ${eventId}.`;
        this.successMessage = '';
      }
    });
  }

  backToEvents(): void {
    this.selectedEventId = null;
    this.selectedEventName = '';
    this.bookings = [];
  }


  editBooking(booking: IBookEvent): void {
      this.router.navigate(['/bookings/update', booking.bookId]);
    }
  
    viewBooking(booking: IBookEvent): void {
      this.router.navigate(['/booking/view', booking.bookId]);
    }
  
 

}
