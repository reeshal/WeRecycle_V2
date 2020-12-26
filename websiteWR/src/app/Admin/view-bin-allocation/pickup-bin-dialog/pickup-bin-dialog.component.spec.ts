import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupBinDialogComponent } from './pickup-bin-dialog.component';

describe('PickupBinDialogComponent', () => {
  let component: PickupBinDialogComponent;
  let fixture: ComponentFixture<PickupBinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupBinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupBinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
