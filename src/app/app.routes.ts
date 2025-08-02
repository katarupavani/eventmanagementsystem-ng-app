import { Routes } from '@angular/router';
import { Feedback } from './feedback/feedback';
import { Feedbackbyid } from './feedbackbyid/feedbackbyid';
import { UserFeedback } from './user-feedback/user-feedback';

export const routes: Routes = [{
    path:"",
    component:Feedback
},{
    path:"getfeedback",
    component:Feedbackbyid
},{
    path:"user-feedbackcomponent",
    component:UserFeedback
}


];
