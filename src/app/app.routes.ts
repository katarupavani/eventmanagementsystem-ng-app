import { Routes } from '@angular/router';
import { RegisterEvent } from './register-event/register-event';
import { ViewBookingComponent } from './view-booking/view-booking';
import { Getevent } from './getevent/getevent';

import { Geteventbyid } from './geteventbyid/geteventbyid';
import { Getupcoming } from './getupcoming/getupcoming';
import {  ViewEventsComponent } from './getbokingsbyid/getbokingsbyid';
import { Register } from './register/register';
import { RegisterService } from './service/register-service';
import { Login } from './login/login';
import { User } from './user/user';
import { Organizer } from './organizer/organizer';
import { Admin } from './admin/admin';
import { Home } from './home/home';
import { Forgotpassword } from './forgotpassword/forgotpassword';
import { Registeruser } from './registeruser/registeruser';
import { Getupcominguser } from './getupcominguser/getupcominguser';
import { Searchuser } from './searchuser/searchuser';
import { Profilepage } from './profilepage/profilepage';
import { BookEvent } from './book-event/book-event';
import { updateBooking} from './update-book/update-book';
import { Event } from './event/event';
import { ManageEvent } from './manage-event/manage-event';
import { Feedback } from './feedback/feedback';
import { Feedbackbyid } from './feedbackbyid/feedbackbyid';
import { Bookingdetailsuser } from './bookinguserdetails/bookinguserdetails';
import { Feedbackbyevent } from './feedbackbyevent/feedbackbyevent';
// import { UpdateBookComponent } from './update-book/update-book';

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
        component:updateBooking
    },{
        path:'register-user/organizer',
        component:Register
    }, { 
        path: 'create-event', 
        component:Event
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
     },{
        path:'',
        component:Home
     },{
        path:'login',
        component:Login
     },
       { path: 'admin', component: Admin },
  { path: 'organizer', component: Organizer },
  { path: 'user', component: User },
  { path: 'login', component: Login },
  {path:'user-events',component:Getevent},{
    path:"fpassword",
    component:Forgotpassword
  },{
    path:"registeruser",
    component:Registeruser
  },{
    path:"upcominguser",
    component:Getupcominguser
  },{
    path:"searchuser",
    component:Searchuser
  },{
    path:"profilepage",
    component:Profilepage
  },{
    path:"manage-events",
    component:ManageEvent
  },{
    path:"feedback",
    component:Feedback
  },{
    path:"view-feedbacks",
    component:Feedbackbyid
  },{
    path:"view-feedback",
    component:Feedbackbyevent
  },{
    path:"bookinguser",
    component:Bookingdetailsuser
  }
    
  

  
];
