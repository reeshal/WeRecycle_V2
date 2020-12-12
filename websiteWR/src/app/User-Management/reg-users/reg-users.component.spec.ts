import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegUsersComponent } from './reg-users.component';

describe('RegUsersComponent', () => {
  let component: RegUsersComponent;
  let fixture: ComponentFixture<RegUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
