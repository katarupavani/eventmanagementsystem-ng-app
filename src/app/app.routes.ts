import { Routes } from '@angular/router';
import { BookEvent } from './book-event/book-event';
import { RegisterEvent } from './register-event/register-event';
import { ViewBookingComponent } from './view-booking/view-booking';
import { UpdateBookComponent } from './update-book/update-book';
import { Getevent } from './getevent/getevent';
import { EventComponent } from './event/event';
import { Geteventbyid } from './geteventbyid/geteventbyid';
import { Getupcoming } from './getupcoming/getupcoming';
import {  ViewEventsComponent } from './getbokingsbyid/getbokingsbyid';

export const routes: Routes = [
    {
        path:'view-bookings',
        component:BookEvent
    },{
        path:"register",
        component:RegisterEvent
    },{
        path: 'booking/view/:id', 
        component:ViewBookingComponent
    },{
        path:'bookings/update/:id',
        component:UpdateBookComponent
    },{
        path:'',
        component:Getevent
    }, { 
        path: 'create-event', 
        component:EventComponent
     },

     {
      path:'getbyid',
      component:Geteventbyid
     },
     {
      path:'getupcoming',
      component:Getupcoming
     },{
        path:'getbyevent',
        component:ViewEventsComponent
     }

];
