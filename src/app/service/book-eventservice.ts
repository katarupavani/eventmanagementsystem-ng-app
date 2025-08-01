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
    return this.httpclient.get<ApiResponse<IBookEvent>>(`${this.baseurl}/bookings/book/${id}`)
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

  
  getAllEvents(): Observable<any> {
    return this.httpclient.get<any>(`${this.baseurl}/events`); // Assuming this exists
  }

  getBookingsByEventId(eventId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.baseurl}/bookings/event/${eventId}`);
  }

  
 getUserBookings(): Observable<any> {
    return this.httpclient.get<any>('/api/bookings/user/bookings');
  }
  deleteBooking(id:number){
    return this.httpclient.delete(`${this.baseurl}/bookings/${id}`)
  }

getBookingsByUserId(userId: number): Observable<any> {
  return this.httpclient.get<any>(`${this.baseurl}/bookings/user/${userId}`);
}
  getAllUsers(): Observable<{ userId: number; userName: string }[]> {
  return this.httpclient.get<ApiResponse<{ userId: number; userName: string }[]>>(`${this.baseurl}/users`)
    .pipe(map(res => res.data));
}

  createBookingByName(bookingData: { username: string; eventName: string }): Observable<any> {
    return this.httpclient.post(`${this.baseurl}/bookings/create-by-names`, bookingData);
  }

  getBookingsByUsername(username: string) {
  return this.httpclient.get<{ status: string; data: any[]; message: string }>(
    `your-api-endpoint/bookings/user/${username}`
  );
}
}
