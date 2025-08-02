import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deleteevent } from './deleteevent';

describe('Deleteevent', () => {
  let component: Deleteevent;
  let fixture: ComponentFixture<Deleteevent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deleteevent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Deleteevent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
