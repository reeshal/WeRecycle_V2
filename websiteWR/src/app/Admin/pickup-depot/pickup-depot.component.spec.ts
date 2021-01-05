import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDepotComponent } from './pickup-depot.component';

describe('PickupDepotComponent', () => {
  let component: PickupDepotComponent;
  let fixture: ComponentFixture<PickupDepotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupDepotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDepotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
