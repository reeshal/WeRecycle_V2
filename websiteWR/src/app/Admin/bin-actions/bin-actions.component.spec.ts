import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinActionsComponent } from './bin-actions.component';

describe('BinActionsComponent', () => {
  let component: BinActionsComponent;
  let fixture: ComponentFixture<BinActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
