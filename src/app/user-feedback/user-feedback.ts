import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../services/feedbackService';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IFeedback } from '../model/feedbackmodel';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-feedback',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './user-feedback.html',
  styleUrls: ['./user-feedback.css']
})
export class UserFeedback {
  searchUserFeedbacks: IFeedback[] = [];
  userIdSearch: number = 0;
  groupedFeedbacksByUser: { [userId: number]: IFeedback[] } = {};
  message: string = '';

  constructor(private feedbackService: FeedbackService, private cdr: ChangeDetectorRef) {}

  searchFeedbackByUserId() {
    this.message = '';
    this.groupedFeedbacksByUser = {};
    this.searchUserFeedbacks = [];

    if (!this.userIdSearch || this.userIdSearch <= 0) {
      this.message = 'Please enter a valid User ID.';
      return;
    }

    this.feedbackService.getFeedbacksByUserId(this.userIdSearch).subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        if (response.status === 'success' && response.data.length > 0) {
          this.searchUserFeedbacks = response.data;
          this.groupFeedbacksByUser();
          this.message = 'Feedbacks fetched successfully.';
          this.cdr.markForCheck();
        } else {
          this.message = 'No feedbacks found for this user.';
          this.searchUserFeedbacks = [];
          this.groupedFeedbacksByUser = {};
        }
      },
      error: (err) => {
        console.error('API Error:', err);
        this.message = 'Error fetching feedbacks.';
        this.searchUserFeedbacks = [];
        this.groupedFeedbacksByUser = {};
        this.cdr.markForCheck();
      }
    });
  }

  groupFeedbacksByUser() {
  this.groupedFeedbacksByUser = {};
  this.searchUserFeedbacks.forEach(feedback => {
    // Defensive checks and console log
    console.log('Feedback userId:', feedback.userid);
    let userId = null;

    if (typeof feedback.userid === 'object' && feedback.userid !== null) {
      userId = feedback.userid.userId;
    } else if (typeof feedback.userid === 'number') {
      userId = feedback.userid;
    }

    if (userId != null) {
      if (!this.groupedFeedbacksByUser[userId]) {
        this.groupedFeedbacksByUser[userId] = [];
      }
      this.groupedFeedbacksByUser[userId].push(feedback);
    }
  });
}


  groupedFeedbackUserIds(): number[] {
    return Object.keys(this.groupedFeedbacksByUser)
      .map(id => Number(id))
      .filter(id => !isNaN(id))
      .sort((a, b) => a - b);
  }
}
