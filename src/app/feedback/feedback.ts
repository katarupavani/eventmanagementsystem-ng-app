import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../service/feedbackService';
import { CommonModule } from '@angular/common';
import { IFeedback } from '../model/feedbackmodel';
import { User } from "../user/user";

@Component({
  selector: 'app-feedback',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, User],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css'
})
export class Feedback {

  feedbacks: IFeedback[] = [];
  groupedFeedbacks: { [eventId: number]: IFeedback[] } = {};
  message: string | undefined;
  viewEventId: number | undefined;
  showForm = true;
  static eventId: any;

  constructor(private feedbackservice: FeedbackService) {}

  Feedbackform = new FormGroup({
    fid: new FormControl('', Validators.required),
    userid: new FormControl('', Validators.required),
    eventid: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    rating: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
  });

  submitFeedback() {
    if (this.Feedbackform.valid) {
      this.feedbackservice.addFeedback(this.Feedbackform.value).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            this.message = 'Feedback submitted successfully!';
            this.Feedbackform.reset();
            this.getFeedback(); // Refresh feedbacks after submission
          } else {
            this.message = 'Failed to submit feedback: ' + response.message;
          }
        },
        error: (error) => {
          this.message = 'Error submitting feedback: ' + error.message;
        }
      });
    } else {
      this.message = 'Please fill all required fields correctly.';
    }
  }

  getFeedback(eventId?: number) {
    if (eventId) {
      this.feedbackservice.getFeedbacksByEventId(eventId).subscribe(
        response => {
          this.feedbacks = response.data;
          this.groupFeedbacks();
        },
        error => {
          console.error('Error fetching feedbacks by event ID:', error);
        }
      );
    } else {
      this.feedbackservice.getAllFeedbacks().subscribe(
        response => {
          this.feedbacks = response.data;
          this.groupFeedbacks();
        },
        error => {
          console.error('Error fetching all feedbacks:', error);
        }
      );
    }
  }
groupFeedbacks() {
  this.groupedFeedbacks = {};
  this.feedbacks.forEach(feedback => {
    const eventId = feedback.eventid.eventId; // Extract the primitive number
    if (!this.groupedFeedbacks[eventId]) {
      this.groupedFeedbacks[eventId] = [];
    }
    this.groupedFeedbacks[eventId].push(feedback);
  });
}

  // Get sorted list of eventIds for displaying grouped feedbacks
 groupedFeedbackEventIds(): number[] {
  return Object.keys(this.groupedFeedbacks)
    .map(id => Number(id))   // convert to number safely
    .filter(id => !isNaN(id)) // filter out any NaN just in case
    .sort((a, b) => a - b);
}

}