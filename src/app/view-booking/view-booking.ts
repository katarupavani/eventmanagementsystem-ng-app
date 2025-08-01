import { Component, OnInit } from '@angular/core';
import { BookEventservice } from '../service/book-eventservice';
import { ActivatedRoute } from '@angular/router';
import { catchError, forkJoin, of, switchMap, tap, throwError } from 'rxjs';
import { IBookEvent } from '../model/createEvent.model';
import { IEvent } from '../model/event.model';
import { User } from '../model/user.model';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-booking',
  imports:[FormsModule,CommonModule],
  templateUrl: './view-booking.html',
  styleUrls: ['./view-booking.css']
})
export class ViewBookingComponent implements OnInit {
goBack() {
location.href="/getbyevent"
}
  booking?: IBookEvent;
  user?: User;
  event?: IEvent;

  constructor(
    private route: ActivatedRoute,
    private bookingSvc: BookEventservice
  ) {}



ngOnInit(): void {
  const bookingId = Number(this.route.snapshot.paramMap.get('id'));

  this.bookingSvc.getBookingId(bookingId).pipe(
    tap(response => {
      console.log('Booking fetched:', response);
      if (response && response.user && response.event) {
        this.booking = response;
        this.user = response.user;
        this.event = response.event;
      } else {
        console.warn('Incomplete booking data', response);
      }
    }),
    catchError(err => {
      console.error('Error fetching booking:', err);
      return of(undefined);
    })
  ).subscribe();
}
}
