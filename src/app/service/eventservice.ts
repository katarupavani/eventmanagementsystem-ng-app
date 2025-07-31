import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEvent } from '../model/eventmodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  deleteEvent(arg0: number) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = '/api';

  constructor(private httpClient: HttpClient) {}

  createEvent(event: any){
    return this.httpClient.post<any>(this.baseUrl+"/events/create", event);
  }

  getEvents(): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl+"/events");
  }

 deleteEventById(id: number) {
  return this.httpClient.delete<any>(`/api/events/${id}`);
}
getEventById(id: number): Observable<any> {
  return this.httpClient.get<any>(`${this.baseUrl}/events/${id}`);
}
getUpcomingEvents() {
  return this.httpClient.get<any>('/api/events/upcoming');
}
registerForEvent(eventId: number, userId: number) {
  return this.httpClient.post<any>('/api/events/create', { eventId, userId });
}
}
