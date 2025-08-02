import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

   role:string = '';

  constructor(private router: Router) {}

  navigateTo(selectedRole: string) {
    this.role = selectedRole;

    if (this.role === 'User') {
      this.router.navigate(['/login']);
    } else if (this.role === 'Organizer') {
      this.router.navigate(['/login']);
    }
}
}
