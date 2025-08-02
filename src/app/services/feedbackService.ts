import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeedback } from '../model/feedbackmodel';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl = '/api';  // Replace this with your API base URL

  constructor(private httpClient: HttpClient) {}

  // Submit feedback
  addFeedback(body: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/add`, body);
  }

  // Get all feedbacks
  getAllFeedbacks() {
    return this.httpClient.get<any>(`${this.baseUrl}`);
  }

  // Get feedbacks by eventId
  getFeedbacksByEventId(eventId: number): Observable<{ status: string; message: string; data: IFeedback[] }> {
    return this.httpClient.get<{ status: string; message: string; data: IFeedback[] }>(
      `${this.baseUrl}/event/${eventId}`
    );
  }

  // Get feedbacks by userId
  getFeedbacksByUserId(userId: number): Observable<{ status: string; message: string; data: IFeedback[] }> {
    return this.httpClient.get<{ status: string; message: string; data: IFeedback[] }>(
      `${this.baseUrl}/user/${userId}`
    );
  }
}
