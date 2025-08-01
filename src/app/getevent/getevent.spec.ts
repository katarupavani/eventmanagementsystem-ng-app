import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getevent } from './getevent';

describe('Getevent', () => {
  let component: Getevent;
  let fixture: ComponentFixture<Getevent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getevent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getevent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
