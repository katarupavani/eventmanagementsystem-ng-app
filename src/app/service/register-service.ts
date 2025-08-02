import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RegisterUser } from '../model/register.model';
import { BookEvent } from '../model/registerevent.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    
   
    baseUrl: string = 'api/users';  

  constructor(private httpClient: HttpClient) {}

  
  createUser(user: RegisterUser) {
    return this.httpClient.post<any>(`${this.baseUrl}/create`, user);
  }

  loginUser(loginData: { username: string; password: string }) {
  return this.httpClient.post<any>(`${this.baseUrl}/login`, loginData);
}
 resetPassword(username: string, newPassword: string) {
    const payload = { username, newPassword };
    return this.httpClient.put(`${this.baseUrl}/resetpassword`, payload);
  }

getUserById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  createBooking(booking: BookEvent): void {
  this.httpClient.post(`${this.baseUrl}/booking/create`, booking).subscribe({
    next: (response: any) => {
      console.log('Booking successful:', response);
      alert('Booking successful!');
    },
    error: (error) => {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    }
  });
}




   
   
   
}
