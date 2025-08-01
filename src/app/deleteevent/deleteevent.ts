import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../service/eventservice';

@Component({
  selector: 'app-deleteevent',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './deleteevent.html',
  styleUrl: './deleteevent.css'
})
export class Deleteevent {
  deleteForm = new FormGroup({
    eventId: new FormControl('')
})

  successMessage = '';
  errorMessage = '';

  constructor(private eventService: EventService) {}

  deleteEvent() {
    const id = this.deleteForm.value.eventId;
    if (!id) {
      this.errorMessage = 'Event ID is required.';
      return;
    }

    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEventById(Number(id)).subscribe(
        (response: { status: string; message: string; }) => {
          if (response.status === 'success') {
            this.successMessage = 'Event deleted successfully!';
            this.errorMessage = '';
            this.deleteForm.reset();
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
          }
        },
        () => {
          this.errorMessage = 'Failed to delete the event.';
          this.successMessage = '';
        }
      );
    }
  }
}