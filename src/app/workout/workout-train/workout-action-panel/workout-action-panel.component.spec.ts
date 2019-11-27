import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutActionPanelComponent } from './workout-action-panel.component';

describe('WorkoutActionPanelComponent', () => {
  let component: WorkoutActionPanelComponent;
  let fixture: ComponentFixture<WorkoutActionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutActionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutActionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
