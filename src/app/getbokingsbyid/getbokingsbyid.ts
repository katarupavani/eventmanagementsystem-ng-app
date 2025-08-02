import { Component } from '@angular/core';
import { IBookEvent, IEvent } from '../model/createEvent.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookEventservice } from '../service/book-eventservice';
import { Organizer } from "../organizer/organizer";
declare var bootstrap: any;
@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [CommonModule,  Organizer],
  templateUrl: './getbokingsbyid.html', 
  styleUrls: ['./getbokingsbyid.css']
})
export class ViewEventsComponent {
 events:IEvent[] = [];  // Added eventdt
  bookings: IBookEvent[] = [];
  selectedEventId: number | null = null;
  selectedEventName: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  selectedBooking: IBookEvent | null = null;

  constructor(private bookEventService: BookEventservice, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.bookEventService.getAllEvents().subscribe({
      next: (response) => {
        console.log("Events fetched:", response);
        this.events = response.data || [];  // Ensure response contains eventdt
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

  openDeleteModal(booking: IBookEvent): void {
    this.selectedBooking = booking;
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
  }

  deleteBooking(): void {
    if (!this.selectedBooking) return;

    this.bookEventService.deleteBooking(this.selectedBooking.bookId!).subscribe({
      next: () => {
        this.successMessage = `Booking ID ${this.selectedBooking?.bookId} deleted successfully.`;
        this.errorMessage = '';
        this.viewBookings(this.selectedEventId!, this.selectedEventName); // Reload bookings after delete
        this.selectedBooking = null;
        const modalEl = document.getElementById('deleteConfirmModal');
        if (modalEl) bootstrap.Modal.getInstance(modalEl).hide();
      },
      error: err => {
        console.error('Delete error:', err);
        this.errorMessage = `Failed to delete booking ID ${this.selectedBooking?.bookId}.`;
        this.successMessage = '';
      }
    });
  }
}