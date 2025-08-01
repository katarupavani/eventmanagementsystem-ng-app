import { Component, OnInit } from '@angular/core';
import { IEvent } from '../model/eventmodel';
import { EventService } from '../service/eventservice';
import { Navbar } from "../navbar/navbar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-getevent',
  templateUrl: './getevent.html',
  styleUrls: ['./getevent.css'],
  imports: [Navbar,CommonModule]
})
export class Getevent implements OnInit {
  events: IEvent[] = [];
  currentIndex = 0;
  successMessage = '';
  errorMessage = '';

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

  nextSlide() {
    if (this.events.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.events.length;
    }
  }

  prevSlide() {
    if (this.events.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.events.length) % this.events.length;
    }
  }

  registerEvent() {
    location.href = '/register';
  }

  getImageForCategory(category: string): string {
    switch (category.toLowerCase()) {
      case 'conference':
        return 'https://images.stockcake.com/public/a/7/a/a7acb612-27c9-469a-bb4f-92695cc7d178_large/tech-conference-presentation-stockcake.jpg';
      case 'wedding':
        return 'https://png.pngtree.com/thumb_back/fh260/background/20250304/pngtree-realistic-serene-candlelit-wedding-stage-with-light-image_17040479.jpg';
      case 'party':
        return 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?fm=jpg&q=60&w=3000';
      default:
        return 'https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg';
    }
  }
}