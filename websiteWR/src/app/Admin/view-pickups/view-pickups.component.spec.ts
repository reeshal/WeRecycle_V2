import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPickupsComponent } from './view-pickups.component';

describe('ViewPickupsComponent', () => {
  let component: ViewPickupsComponent;
  let fixture: ComponentFixture<ViewPickupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPickupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
