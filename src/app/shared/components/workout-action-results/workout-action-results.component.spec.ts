import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutActionResultsComponent } from './workout-action-results.component';

describe('WorkoutActionResultsComponent', () => {
  let component: WorkoutActionResultsComponent;
  let fixture: ComponentFixture<WorkoutActionResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutActionResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutActionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
