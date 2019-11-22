import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutActionComponent } from './workout-action.component';

describe('WorkoutActionComponent', () => {
  let component: WorkoutActionComponent;
  let fixture: ComponentFixture<WorkoutActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
