import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [FormsModule,CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit{
    username:string=''
    password=''
    email=''

  ngOnInit(): void {
    const storedUsername = localStorage.getItem('loggedInUser');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }
}
