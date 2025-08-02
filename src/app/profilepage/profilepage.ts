import { Component } from '@angular/core';
import { RegisterService } from '../service/register-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profilepage',
  imports: [CommonModule],
  templateUrl: './profilepage.html',
  styleUrl: './profilepage.css'
})
export class Profilepage {
   
  user: any = null;

  constructor(private userService: RegisterService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('userRole'); 

    if (userId) {
      this.userService.getUserById(+userId).subscribe({
        next: (response: any) => {
          console.log('User profile response:', response);

          if (response.status === 'success') {
            this.user = response.data;

            
            if (!this.user.role && storedRole) {
              this.user.role = storedRole;
            }

          } else {
            alert('Failed to load user profile.');
          }
        },
        error: (error) => {
          console.error('Error fetching profile:', error);
          alert('An error occurred while fetching user profile.');
        }
      });
    } else {
      alert('User not logged in.');
    }
  }
}
