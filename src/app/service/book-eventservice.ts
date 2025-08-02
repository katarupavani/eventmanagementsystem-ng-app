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
getBookEvents(eventId?: number): Observable<ApiResponse<IBookEvent[]>> {
  const url = eventId != null
    ? `${this.baseurl}/bookings/event/${eventId}`
    : `${this.baseurl}/bookings`;

  return this.httpclient.get<ApiResponse<IBookEvent[]>>(url);
}

  // Create a booking
  createBooking(booking: any): Observable<ApiResponse<IBookEvent>> {
    return this.httpclient.post<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/create`, booking);
  }

  // Fetch booking by ID
  getBookingId(id: number): Observable<IBookEvent> {
    return this.httpclient.get<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/book/${id}`)
      .pipe(map(res => res.data));
  }

  // Update booking by ID
  updateBooking(id: number, bookingData: any): Observable<ApiResponse<IBookEvent>> {
    return this.httpclient.put<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/update/${id}`, bookingData);
  }

  // Fetch user by ID (optional)
  getUserById(userId: number): Observable<User | undefined> {
    return this.httpclient.get<ApiResponse<User>>(`${this.baseurl}/users/${userId}`)
      .pipe(
        map(res => res.data),
        catchError(err => {
          console.warn('User fetch failed:', err);
          return of(undefined);
        })
      );
  }

  // Get all events
  getEvents(): Observable<IEvent[]> {
    return this.httpclient.get<ApiResponse<IEvent[]>>(`${this.baseurl}/events`)
      .pipe(
        map(response => response.data),
        catchError(err => {
          console.error('Failed to fetch events:', err);
          return of([]); // return empty array on error
        })
      );
  }

  // Alternative method to get all events (if you need raw response)
  getAllEvents(): Observable<ApiResponse<IEvent[]>> {
    return this.httpclient.get<ApiResponse<IEvent[]>>(`${this.baseurl}/events`);
  }

  // Get bookings by event ID
  getBookingsByEventId(eventId: number): Observable<ApiResponse<IBookEvent[]>> {
    return this.httpclient.get<ApiResponse<IBookEvent[]>>(`${this.baseurl}/bookings/event/${eventId}`);
  }

  // Get bookings for a user (you might want to check your backend endpoint here)
  getUserBookings(): Observable<ApiResponse<IBookEvent[]>> {
    return this.httpclient.get<ApiResponse<IBookEvent[]>>(`${this.baseurl}/bookings/user/bookings`);
  }

  // Delete booking by ID
  deleteBooking(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.baseurl}/bookings/${id}`);
  }

  // Get bookings by user ID
  getBookingsByUserId(userId: number): Observable<ApiResponse<IBookEvent[]>> {
    return this.httpclient.get<ApiResponse<IBookEvent[]>>(`${this.baseurl}/bookings/user/${userId}`);
  }

  // Get all users (assuming this endpoint exists)
  getAllUsers(): Observable<{ userId: number; userName: string }[]> {
    return this.httpclient.get<ApiResponse<{ userId: number; userName: string }[]>>(`${this.baseurl}/users`)
      .pipe(map(res => res.data));
  }

  // Create booking by username and eventName
  createBookingByName(bookingData: { username: string; eventName: string }): Observable<ApiResponse<IBookEvent>> {
    return this.httpclient.post<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/create-by-names`, bookingData);
  }

  // Get bookings by username (make sure you have the right endpoint here)
  getBookingsByUsername(username: string): Observable<ApiResponse<IBookEvent[]>> {
    return this.httpclient.get<ApiResponse<IBookEvent[]>>(`${this.baseurl}/bookings/user/${username}`);
  }
}
