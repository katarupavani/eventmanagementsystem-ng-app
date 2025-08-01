import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingHistory } from './user-booking-history';

describe('UserBookingHistory', () => {
  let component: UserBookingHistory;
  let fixture: ComponentFixture<UserBookingHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookingHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
