import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsFiltersComponent } from './results-filters.component';

describe('ResultsFiltersComponent', () => {
  let component: ResultsFiltersComponent;
  let fixture: ComponentFixture<ResultsFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
