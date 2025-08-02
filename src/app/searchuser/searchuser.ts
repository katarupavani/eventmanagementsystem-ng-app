import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IEvent } from '../model/event.model';
import { EventService } from '../service/eventservice';
import { User } from '../user/user';

@Component({
  selector: 'app-searchuser',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,User],
  templateUrl: './searchuser.html',
  styleUrl: './searchuser.css'
})
export class Searchuser implements OnInit {
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
