import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../service/eventservice';
import { IEvent } from '../models/eventmodel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getevent',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './getevent.html',
  styleUrl: './getevent.css'
})
export class Getevent implements OnInit {
  successMessage = '';
  errorMessage = '';
  events: IEvent[] = [];
  isEditing = false;

  eventForm = new FormGroup({
    eventId: new FormControl(),
    eventName: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    limit: new FormControl(),
    location: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        if (response.status === 'sucess') {
          this.events = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load events';
      }
    });
  }

  // Submit for Create or Update
  submitForm() {
    const formValue = this.eventForm.value;

    if (this.eventForm.valid) {
      if (this.isEditing) {
        // UPDATE
        this.eventService.updateEvent(Number(formValue.eventId), formValue).subscribe({
          next: () => {
            this.successMessage = 'Event updated successfully!';
            this.errorMessage = '';
            this.eventForm.reset();
            this.isEditing = false;
            this.fetchEvents();
          },
          error: () => {
            this.errorMessage = 'Failed to update event.';
            this.successMessage = '';
          }
        });
      } else {
        // CREATE
        this.eventService.createEvent(formValue).subscribe({
          next: () => {
            this.successMessage = 'Event created successfully!';
            this.errorMessage = '';
            this.eventForm.reset();
            this.fetchEvents();
          },
          error: () => {
            this.errorMessage = 'Failed to create event.';
            this.successMessage = '';
          }
        });
      }
    }
  }

  // Load selected event into form
  editEvent(event: IEvent) {
    this.isEditing = true;
    this.eventForm.setValue({
      eventId: event.eventId,
      eventName: event.eventName,
      category: event.category,
      description: event.description,
      //limit: event.limit.toString(),
       // convert number to string for form
       limit: event.limit,

      location: event.location,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
    });
  }

  // DELETE
  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEventById(id).subscribe({
        next: () => {
          this.successMessage = 'Event deleted.';
          this.fetchEvents();
        },
        error: () => {
          this.errorMessage = 'Delete failed.';
        }
      });
    }
  }

  cancelEdit() {
    this.eventForm.reset();  
    this.isEditing = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
