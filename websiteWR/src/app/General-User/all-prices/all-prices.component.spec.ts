import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPricesComponent } from './all-prices.component';

describe('AllPricesComponent', () => {
  let component: AllPricesComponent;
  let fixture: ComponentFixture<AllPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
