import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateevent } from './updateevent';

describe('Updateevent', () => {
  let component: Updateevent;
  let fixture: ComponentFixture<Updateevent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Updateevent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateevent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
