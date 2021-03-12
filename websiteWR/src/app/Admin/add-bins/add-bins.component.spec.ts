import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBinsComponent } from './add-bins.component';

describe('AddBinsComponent', () => {
  let component: AddBinsComponent;
  let fixture: ComponentFixture<AddBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
