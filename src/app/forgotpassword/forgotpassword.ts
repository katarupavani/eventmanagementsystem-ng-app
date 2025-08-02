import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register-service';

@Component({
  selector: 'app-forgotpassword',
  imports: [FormsModule,CommonModule],
  templateUrl: './forgotpassword.html',
  styleUrl: './forgotpassword.css'
})
export class Forgotpassword {
username: string='';

  newPassword: string = '';
  successMessage: string = '';
  errorMessage: string='';

  constructor(private router: Router,private resetService:RegisterService) {}

    onReset() {
    this.resetService.resetPassword(this.username, this.newPassword).subscribe({
      next: (res: any) => {
        this.successMessage = 'Your password is updated and you can login';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: (err) => {
        this.errorMessage = 'Unable to reset password. Try again.';
        console.error(err);
      }
    });
  }
}



