import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPickupModalComponent } from './view-pickup-modal.component';

describe('ViewPickupModalComponent', () => {
  let component: ViewPickupModalComponent;
  let fixture: ComponentFixture<ViewPickupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPickupModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPickupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
