import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getupcoming } from './getupcoming';

describe('Getupcoming', () => {
  let component: Getupcoming;
  let fixture: ComponentFixture<Getupcoming>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getupcoming]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getupcoming);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
