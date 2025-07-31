import { Component } from '@angular/core';
import { IEvent } from '../model/eventmodel';
import { EventService } from '../service/eventservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Navbar } from "../navbar/navbar";

@Component({
  selector: 'app-getupcoming',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, Navbar],
  templateUrl: './getupcoming.html',
  styleUrl: './getupcoming.css'
})
export class Getupcoming {
upcomingEvents: IEvent[] = [];
  errorMessage = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.fetchUpcomingEvents();
  }

  fetchUpcomingEvents() {
    this.eventService.getUpcomingEvents().subscribe(
      (res) => {
        this.upcomingEvents = res.data;
      },
      (err) => {
        this.errorMessage = 'Unable to fetch upcoming events';
      }
    );
  }
}
