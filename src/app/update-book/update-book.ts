import { ActivatedRoute } from "@angular/router";
import { IBookEvent, IEvent } from "../model/createEvent.model";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BookEventservice } from "../service/book-eventservice";
import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-book.html',
  styleUrls: ['./update-book.css']
})

export class updateBooking implements OnInit {
  bookingForm: FormGroup;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  bookingId!: number;
  events: IEvent[] = [];
  userId!: number; // Add this to store userId

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private bookService: BookEventservice
  ) {
    this.bookingForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      eventId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.bookingId = idParam ? Number(idParam) : 0;

    this.loadEvents();

    if (this.bookingId > 0) {
      this.isEditMode = true;
      this.loadBooking(this.bookingId);
    } else {
      this.errorMessage = 'Invalid booking ID.';
    }
  }

loadBooking(id: number): void {
  this.bookService.getBookingId(id).subscribe(
    (booking: IBookEvent) => {
      console.log('Fetched booking:', booking);

      const username = booking?.user?.username;
      const eventId = booking?.event?.eventId;
      const userId = booking?.user?.userId;

      if (username && eventId != null && userId != null) {
        this.userId = userId;
        this.bookingForm.patchValue({ username, eventId });
        this.errorMessage = '';
      } else {
        console.warn('Invalid data:', { username, eventId, userId });
        this.errorMessage = 'Invalid booking data received. Missing username, event ID, or user ID.';
      }
    },
    error => {
      this.errorMessage = 'Error fetching booking details.';
      console.error('Booking fetch error:', error);
    }
  );
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

      if (this.isEditMode && this.bookingId > 0 && this.userId) {
        const updatePayload = {
          userId: this.userId,  // Now sending userId correctly
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
        this.errorMessage = 'Invalid booking data or missing user ID.';
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  goBack(): void {
    window.location.href = '/getbyevent';
  }
}