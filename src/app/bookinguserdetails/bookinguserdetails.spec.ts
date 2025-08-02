import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookinguserdetails } from './bookinguserdetails';

describe('Bookinguserdetails', () => {
  let component: Bookinguserdetails;
  let fixture: ComponentFixture<Bookinguserdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookinguserdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookinguserdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
