import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getbokingsbyid } from './getbokingsbyid';

describe('Getbokingsbyid', () => {
  let component: Getbokingsbyid;
  let fixture: ComponentFixture<Getbokingsbyid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getbokingsbyid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getbokingsbyid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
