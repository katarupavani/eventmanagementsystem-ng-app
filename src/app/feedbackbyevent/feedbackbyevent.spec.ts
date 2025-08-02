import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackbyevent } from './feedbackbyevent';

describe('Feedbackbyevent', () => {
  let component: Feedbackbyevent;
  let fixture: ComponentFixture<Feedbackbyevent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feedbackbyevent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feedbackbyevent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
