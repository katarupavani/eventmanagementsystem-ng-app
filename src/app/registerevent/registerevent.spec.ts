import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registerevent } from './registerevent';

describe('Registerevent', () => {
  let component: Registerevent;
  let fixture: ComponentFixture<Registerevent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registerevent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registerevent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
