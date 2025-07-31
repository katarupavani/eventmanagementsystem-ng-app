import { Component } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { IBookEvent } from '../model/createEvent.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";

// Bootstrap modal import
declare var bootstrap: any;

@Component({
  selector: 'app-book-event',
  imports: [CommonModule, Navbar],
  templateUrl: './book-event.html',
  styleUrls: ['./book-event.css']
})
export class BookEvent  {
  events: IBookEvent[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  selectedBooking: IBookEvent | null = null; // For modal

  constructor(private bookEventService: BookEventservice, private router: Router) {}

    ngOnInit(): void {
    this.getEvents(); // 🚀 Automatically fetch bookings on load
  }

  getEvents(): void {
    this.bookEventService.getBookEvents().subscribe({
      next: response => {
        this.events = response.data || [];
        
        this.errorMessage = '';
      },
      error: err => {
        console.error('Error fetching bookings:', err);
        this.errorMessage = 'Failed to load bookings.';
        this.successMessage = '';
      }
    });
  }

  editBooking(booking: IBookEvent): void {
    this.router.navigate(['/bookings/update', booking.bookId]);
  }

  viewBooking(booking: IBookEvent): void {
    this.router.navigate(['/booking/view', booking.bookId]);
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
        this.getEvents();
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
