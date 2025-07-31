import { Component } from '@angular/core';
import { IEvent } from '../model/eventmodel';
import { EventService } from '../service/eventservice';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-event',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, Navbar], // Correct imports
  templateUrl: './event.html',
  styleUrls: ['./event.css']  // Fixed 'styleUrl' to 'styleUrls'
})
export class EventComponent {
  successMessage = '';
  errorMessage = '';

  // Correct form group initialization
  eventForm = new FormGroup({
    eventId: new FormControl(''),
    eventName: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    limit: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  });

  constructor(private eventService: EventService) {}

  // Correct method declaration with no extra semicolon after it
  submitForm() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        (response) => {
          this.successMessage = 'Event created successfully!';
          this.errorMessage = '';
          this.eventForm.reset();  // Reset the form after successful submission
        },
        (error) => {
          this.errorMessage = 'Failed to create event. Please try again.';
          this.successMessage = '';
        }
      );
    }
  }
}
