import { Component } from '@angular/core';
import { Profilepage } from "../profilepage/profilepage";
import { Landingpage } from "../landingpage/landingpage";
import { EventService } from '../service/eventservice';
import { RegisterService } from '../service/register-service';

@Component({
  selector: 'app-organizer',
  imports: [ Landingpage],
  templateUrl: './organizer.html',
  styleUrl: './organizer.css'
})
export class Organizer {
 userId: string | null = localStorage.getItem('userId');
  events: any[] = [];
  upcomingEvents: any[] = [];
  bookings: any[] = [];
username: any;

  constructor(private eventService: EventService,private userService: RegisterService) {}

  // ngOnInit(): void {
  //   this.loadEvents();
  //   this.loadUpcomingEvents();
  //   // this.loadBookings();
  // }

  loadEvents(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Failed to load events:', err);
      }
    });
  }

  loadUpcomingEvents(): void {
    this.eventService.getUpcomingEvents().subscribe({
      next: (data) => {
        this.upcomingEvents = data;
      },
      error: (err) => {
        console.error('Failed to load upcoming events:', err);
      }
    });
  }

  // loadBookings(): void {
  //   if (!this.userId) return;

  //   this.eventService.getBookingHistory(this.userId).subscribe({
  //     next: (data) => {
  //       this.bookings = data;
  //     },
  //     error: (err) => {
  //       console.error('Failed to load bookings:', err);
  //     }
  //   });
  // }
   user: any = null;
  
  
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
       this.loadEvents();
    this.loadUpcomingEvents();
    }

    
}
