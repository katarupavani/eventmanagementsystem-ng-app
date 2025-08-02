import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedbackService';
import { CommonModule } from '@angular/common';

interface Event {
  eventId: number;
  eventName: string;
  avgRating?: number; // optional, will be calculated
}

@Component({
  selector: 'app-feedbackbyid',
  templateUrl: './feedbackbyid.html',
  styleUrls: ['./feedbackbyid.css'],
  imports: [CommonModule],
})
export class Feedbackbyid implements OnInit {
  events: Event[] = [
    { eventId: 1, eventName: 'Music Concert' },
    { eventId: 2, eventName: 'Tech Conference' },
    { eventId: 3, eventName: 'Art Exhibition' },
  ];

  feedbacks: any[] = [];
  allFeedbacks: any[] = [];

  message: string = '';
  selectedEventId: number | null = null;
  selectedEventName: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (feedbackResponse: any) => {
        if (feedbackResponse.status === 'success') {
          this.allFeedbacks = feedbackResponse.data;
          this.calculateAverageRatings();
        } else {
          this.message = 'Failed to fetch feedbacks: ' + feedbackResponse.message;
        }
      },
      error: (err) => {
        this.message = 'Error fetching feedbacks: ' + err.message;
      },
    });
  }

 calculateAverageRatings() {
  this.events = this.events.map(event => {
    const feedbacksForEvent = this.allFeedbacks.filter(f => f.eventid === event.eventId);
    const avg = feedbacksForEvent.length
      ? feedbacksForEvent.reduce((sum, f) => sum + f.rating, 0) / feedbacksForEvent.length
      : 0;

    // Round to 1 decimal place
    const avgRating = Math.round(avg * 10) / 10;

    return { ...event, avgRating };
  });
}
            
  getFeedback(eventId: number) {
    this.selectedEventId = eventId;
    const event = this.events.find(e => e.eventId === eventId);
    this.selectedEventName = event ? event.eventName : '';

    this.message = '';
    this.feedbackService.getFeedbacksByEventId(eventId).subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.feedbacks = response.data;
          if (!this.feedbacks.length) {
            this.message = 'No feedbacks available for this event.';
          }
        } else {
          this.message = 'Failed to fetch feedbacks: ' + response.message;
          this.feedbacks = [];
        }
      },
      error: (err) => {
        this.message = 'Error fetching feedbacks: ' + err.message;
        this.feedbacks = [];
      },
    });
  }


}
