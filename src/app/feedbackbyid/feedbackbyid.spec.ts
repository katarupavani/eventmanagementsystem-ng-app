import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Feedbackbyid } from './feedbackbyid';

describe('Feedbackbyid', () => {
  let component: Feedbackbyid;
  let fixture: ComponentFixture<Feedbackbyid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Feedbackbyid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Feedbackbyid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
