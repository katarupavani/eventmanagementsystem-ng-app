import { Routes } from '@angular/router';
import { Home } from './home/home';
import { User } from './user/user';
import { Organizer } from './organizer/organizer';
import { Login } from './login/login';
import { Register } from './register/register';
import { Forgotpassword } from './forgotpassword/forgotpassword';
import { Registerevent } from './registerevent/registerevent';
import { Profilepage } from './profilepage/profilepage';

export const routes: Routes = [
    {
        path:"",
        component:Home
    },
    {
        path:"user",
        component:User
    },{
        path:"organizer",
        component:Organizer
    },{
        path:"login",
        component:Login
    },{
        path:"register",
        component:Register
    },{
        path:"fpassword",
        component:Forgotpassword
    },{
        path:"eventregister",
        component:Registerevent
    },{
        path:"profilepage",
        component:Profilepage
    }
];
