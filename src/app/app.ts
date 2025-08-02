
import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Feedback } from "./feedback/feedback";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [ RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
