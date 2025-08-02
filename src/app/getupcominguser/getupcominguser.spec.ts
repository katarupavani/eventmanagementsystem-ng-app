import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Getupcominguser } from './getupcominguser';

describe('Getupcominguser', () => {
  let component: Getupcominguser;
  let fixture: ComponentFixture<Getupcominguser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Getupcominguser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Getupcominguser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
