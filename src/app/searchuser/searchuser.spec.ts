import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Searchuser } from './searchuser';

describe('Searchuser', () => {
  let component: Searchuser;
  let fixture: ComponentFixture<Searchuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Searchuser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Searchuser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
