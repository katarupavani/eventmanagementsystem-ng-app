import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../service/register-service';
import { RegisterUser } from '../model/register.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  username:string='';
  password:string='';
  email:string='';
 userid: number=0;
role:string='';
 registrationSuccess: boolean = false;
    constructor(private registerService: RegisterService) {}

  onSubmit() {
    const user:RegisterUser={
      userId:this.userid,
      username: this.username,
      password: this.password,
      email: this.email,
      role:this.role
     
    };

    this.registerService.createUser(user).subscribe({
      next: (response) => {
        if(response.status === 'success') {
          alert('User registered successfully!');
         this.registrationSuccess = true;
          this.username = '';
          this.password = '';
          this.email = '';
          this.role='';
        } else {
          console.log('Registration failed: ' + response.message);
        }
      },
      error: (error) => {
        console.log('Error occurred: ' + error.message);
      }
    });

    
    
}
}


