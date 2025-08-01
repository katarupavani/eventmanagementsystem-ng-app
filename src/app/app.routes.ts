import { Routes } from '@angular/router';
import { Event } from './event/event';
import { Home } from './home/home';
import { Getevent } from './getevent/getevent';
import { Deleteevent } from './deleteevent/deleteevent';
import { Geteventbyid } from './geteventbyid/geteventbyid';
import { Getupcoming } from './getupcoming/getupcoming';
import { Updateevent } from './updateevent/updateevent';


export const routes: Routes = [
    
   
     { path: '', 
        component:Home
     },
     { path: 'event', 
        component:Event
     },

     {
      path:'getevent',
      component:Getevent
     },

     {
      path:'deleteevent',
      component:Deleteevent
     },

     {
      path:'getbyid',
      component:Geteventbyid
     },
     {
      path:'getupcoming',
      component:Getupcoming
     },{
      path:'updateevent',
      component:Updateevent
     }

];
