import { Routes } from '@angular/router';
import { BookEvent } from './book-event/book-event';
import { RegisterEvent } from './register-event/register-event';

export const routes: Routes = [
    {
        path:"",
        component:BookEvent
    },{
        path:"register",
        component:RegisterEvent
    }
];
