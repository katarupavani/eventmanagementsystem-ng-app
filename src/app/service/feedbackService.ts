import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFeedback } from '../model/feedbackmodel';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private baseUrl = '/api'; // Update this if your API has a different base path

  constructor(private httpClient: HttpClient) {}

  // Submit feedback
  addFeedback(body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/add`, body);
  }

  // Get all feedbacks
 getAllFeedbacks(): Observable<{ status: string; message: string; data: IFeedback[] }> {
  return this.httpClient.get<{ status: string; message: string; data: IFeedback[] }>(`${this.baseUrl}`);
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
