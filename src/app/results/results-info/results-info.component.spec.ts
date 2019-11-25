import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsInfoComponent } from './results-info.component';

describe('ResultsInfoComponent', () => {
  let component: ResultsInfoComponent;
  let fixture: ComponentFixture<ResultsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
