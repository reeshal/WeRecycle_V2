import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinRequestsComponent } from './bin-requests.component';

describe('BinRequestsComponent', () => {
  let component: BinRequestsComponent;
  let fixture: ComponentFixture<BinRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
