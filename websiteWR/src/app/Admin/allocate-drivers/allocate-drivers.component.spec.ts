import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateDriversComponent } from './AllocateDriversComponent';

describe('AllocateDriversComponent', () => {
  let component: AllocateDriversComponent;
  let fixture: ComponentFixture<AllocateDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllocateDriversComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
