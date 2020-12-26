import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBinAllocationComponent } from './view-bin-allocation.component';

describe('ViewBinAllocationComponent', () => {
  let component: ViewBinAllocationComponent;
  let fixture: ComponentFixture<ViewBinAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBinAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBinAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
