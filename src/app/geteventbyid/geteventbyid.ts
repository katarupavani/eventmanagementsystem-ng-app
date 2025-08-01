import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvent } from '../models/eventmodel';
import { EventService } from '../service/eventservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-geteventbyid',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './geteventbyid.html',
  styleUrl: './geteventbyid.css'
})
export class Geteventbyid implements OnInit {
  eventForm!: FormGroup;
  eventById: IEvent | null = null;

  constructor(private eventService: EventService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      event_id: ['', Validators.required]
    });
  }

  submitForm() {
    const id = this.eventForm.value.event_id;
    this.eventService.getEventById(id).subscribe({
      next: response => this.eventById = response.data,
      error: () => this.eventById = null
    });
  }
}
