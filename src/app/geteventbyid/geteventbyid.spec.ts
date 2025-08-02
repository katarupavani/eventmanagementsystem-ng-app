import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Geteventbyid } from './geteventbyid';

describe('Geteventbyid', () => {
  let component: Geteventbyid;
  let fixture: ComponentFixture<Geteventbyid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Geteventbyid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Geteventbyid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
