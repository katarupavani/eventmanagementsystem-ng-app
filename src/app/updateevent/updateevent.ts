import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../service/eventservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateevent',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './updateevent.html',
  styleUrl: './updateevent.css'
})
export class Updateevent implements OnInit {
  eventForm!: FormGroup;
  eventId!: number;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private eventService: EventService) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      limit: ['', [Validators.required, Validators.min(11)]],
      location: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  getEventById(id: number) {
    if (!id) {
      this.errorMessage = 'Please enter a valid ID';
      return;
    }

    this.eventService.getEventById(id).subscribe({
      next: (response) => {
        this.eventForm.patchValue(response.data);
        this.successMessage = 'Event loaded. Now you can update.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Event not found';
        this.successMessage = '';
      }
    });
  }

  updateEvent() {
    if (this.eventForm.invalid || !this.eventId) {
      this.errorMessage = 'Please enter a valid Event ID and fill the form.';
      return;
    }

    this.eventService.updateEvent(this.eventId, this.eventForm.value).subscribe({
      next: () => {
        this.successMessage = 'Event updated successfully!';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to update event';
        this.successMessage = '';
      }
    });
  }
}
