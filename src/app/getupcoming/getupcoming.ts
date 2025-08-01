import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IEvent } from '../model/eventmodel';
import { EventService } from '../service/eventservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-getupcoming',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './getupcoming.html',
  styleUrl: './getupcoming.css'
})
export class Getupcoming implements OnInit, AfterViewInit {
  upcomingEvents: IEvent[] = [];
  errorMessage = '';
  dotPositions: { x: number, y: number }[] = [];
  hoveredEventIndex: number | null = null;
  popupPosition = { top: '0px', left: '0px' };

  @ViewChild('timelineSVG') timelineSVGRef!: ElementRef<SVGSVGElement>;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.fetchUpcomingEvents();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calculateDotPositions(), 300);
  }

  fetchUpcomingEvents(): void {
    this.eventService.getUpcomingEvents().subscribe({
      next: (res) => {
        if (res?.status === 'success' && Array.isArray(res.data)) {
          this.upcomingEvents = res.data;
          setTimeout(() => this.calculateDotPositions(), 100);
        } else {
          this.errorMessage = res.message || 'Unexpected response.';
        }
      },
      error: () => {
        this.errorMessage = 'Unable to fetch upcoming events';
      }
    });
  }

  calculateDotPositions(): void {
    const svg = this.timelineSVGRef?.nativeElement;
    const path = svg?.querySelector('path');
    if (!path || this.upcomingEvents.length === 0) return;

    const totalLength = path.getTotalLength();
    const step = totalLength / (this.upcomingEvents.length + 1);

    const svgRect = svg.getBoundingClientRect();

    // Updated scaling for larger viewBox (1200x600)
this.dotPositions = this.upcomingEvents.map((_, i) => {
  const point = path.getPointAtLength(step * (i + 1));
  return {
    x: point.x * svg.clientWidth / 1200,
    y: point.y * svg.clientHeight / 600
  };
});

  }

  showPopup(index: number): void {
    this.hoveredEventIndex = index;
    const pos = this.dotPositions[index];
    this.popupPosition = { top: pos.y + 'px', left: pos.x + 'px' };
  }

  hidePopup(): void {
    this.hoveredEventIndex = null;
  }
}
