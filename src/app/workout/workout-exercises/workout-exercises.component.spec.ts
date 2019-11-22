import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutExercisesComponent } from './workout-exercises.component';

describe('WorkoutExercisesComponent', () => {
  let component: WorkoutExercisesComponent;
  let fixture: ComponentFixture<WorkoutExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
