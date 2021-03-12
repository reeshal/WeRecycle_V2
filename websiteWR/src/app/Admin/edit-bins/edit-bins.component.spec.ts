import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBinsComponent } from './edit-bins.component';

describe('EditBinsComponent', () => {
  let component: EditBinsComponent;
  let fixture: ComponentFixture<EditBinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
