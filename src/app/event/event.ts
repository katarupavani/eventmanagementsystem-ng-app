import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventService } from '../service/eventservice';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './event.html',
  styleUrls: ['./event.css']
})
export class Event {
  successMessage = '';
  errorMessage = '';

  dateNotInPast(control: FormControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const today = new Date();
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate < today ? { pastDate: true } : null;
  }

  eventForm = new FormGroup({
    //eventId: new FormControl('', Validators.required),
    eventName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    limit: new FormControl('', [Validators.required, Validators.min(1)]),
    location: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, this.dateNotInPast]),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  constructor(private eventService: EventService) {}

  submitForm() {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value).subscribe(
        () => {
          this.successMessage = 'Event created successfully!';
          this.errorMessage = '';
          this.eventForm.reset();
        },
        () => {
          this.errorMessage = 'Failed to create event. Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      this.successMessage = '';
    }
  }
}
