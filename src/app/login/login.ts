import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { loginuser } from '../model/login.model';
import { RegisterService } from '../service/register-service';



@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
   
export class Login  {
toggleForgotPassword() {
throw new Error('Method not implemented.');
}
showForgotPassword: any;
resetPassword() {
throw new Error('Method not implemented.');
}
    username:string='';
    password:string='';

   

  constructor(private loginservice:RegisterService, private router: Router) {}

  /*onLogin() {
    let loginData = {
      username: this.username,
      password: this.password
    };
   this.loginservice.loginUser(loginData).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      const role = response.data?.role;

      if (role === 'admin') {
        this.router.navigate(['/admin-home']);
      } else if (role === 'organizer') {
        this.router.navigate(['/organizer']);
      } else if (role === 'user') {
        this.router.navigate(['/user']);
      } else {
        alert('Unknown role: ' + role);
      }
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('Invalid credentials or server error.');
    }
  });*/
    
    
    onLogin() {
  const loginData = {
    username: this.username,
    password: this.password
  };

  this.loginservice.loginUser(loginData).subscribe({
    next: (response) => {
      console.log('Login successful:', response);
      const role = response.data?.role;
      const username = response.data?.username;  
     const userId = response.data?.userId;
      
      localStorage.setItem('loggedInUser', username || this.username);
       localStorage.setItem('userId', userId?.toString());

    
      if (role === 'admin') {
        this.router.navigate(['/admin-home']);
      } else if (role === 'organizer') {
        this.router.navigate(['/organizer']);
      } else if (role === 'user') {
        this.router.navigate(['/user']);
      } else {
        alert('Unknown role: ' + role);
      }
    },
    error: (err) => {
      console.error('Login failed:', err);
      alert('Invalid credentials or server error.');
    }
  });
}



}



   






