import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IBookEvent } from '../model/createEvent.model';
import { ApiResponse } from '../model/api.response.model';
import { User } from '../model/user.model';
import { IEvent } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class BookEventservice {
  private baseurl: string = '/api';

  constructor(private httpclient: HttpClient) {}

  // Fetch all bookings
  getBookEvents(): Observable<ApiResponse<IBookEvent[]>> {
    return this.httpclient.get<ApiResponse<IBookEvent[]>>(`${this.baseurl}/bookings`);
  }

  // Create a booking
  createBooking(booking: any): Observable<ApiResponse<IBookEvent>> {
    return this.httpclient.post<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/create`, booking);
  }

  // Fetch booking by ID
  getBookingId(id: number): Observable<IBookEvent> {
    return this.httpclient.get<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/${id}`)
      .pipe(map(res => res.data));
  }

  // Update booking by ID
  updateBooking(id: number, bookingData: any): Observable<ApiResponse<IBookEvent>> {
    return this.httpclient.put<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/update/${id}`, bookingData);
  }

  // Fetch user by ID (optional)
  getUserById(userId: number): Observable<User | undefined> {
    return this.httpclient.get<ApiResponse<User>>(`${this.baseurl}/bookings/user/${userId}`)
      .pipe(
        map(res => res.data),
        catchError(err => {
          console.warn('User fetch failed:', err);
          return of(undefined);
        })
      );
  }

  
  getAllEvents(): Observable<any> {
    return this.httpclient.get<any>(`${this.baseurl}/events`); // Assuming this exists
  }

  getBookingsByEventId(eventId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseurl}/bookings/event/${eventId}`);
  }

  

  deleteBooking(id:number){
    return this.httpclient.delete(`${this.baseurl}/bookings/${id}`)
  }
}
