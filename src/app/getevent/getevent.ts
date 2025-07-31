import { Component } from '@angular/core';
import { IEvent } from '../model/eventmodel';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { EventService } from '../service/eventservice';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";
import { Geteventbyid } from "../geteventbyid/geteventbyid";

@Component({
  selector: 'app-getevent',
  imports: [FormsModule, CommonModule, Navbar, Geteventbyid],
  templateUrl: './getevent.html',
  styleUrl: './getevent.css'
})
export class Getevent {
successMessage = '';
  errorMessage = '';
  events: IEvent[] = [];

  eventForm = new FormGroup({
    event_id: new FormControl(''),
    event_name: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    limit: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl(''),
    start_time: new FormControl(''),
    end_time: new FormControl(''),
  });

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe(
      (response) => {
        if (response.status === 'sucess') {
          this.events = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'Failed to load events';
      }
    );
  }
  
     
  

  submitForm() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        (response) => {
          this.successMessage = 'Event created successfully!';
          this.errorMessage = '';
          this.eventForm.reset();
          this.fetchEvents(); 
        },
        (error) => {
          this.errorMessage = 'Failed to create event. Please try again.';
          this.successMessage = '';
        }
      );
    }
  }

registerEvent(){
  location.href="/register"
}
}
