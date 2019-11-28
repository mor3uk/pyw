import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutPanelComponent } from './workout-panel.component';

describe('WorkoutPanelComponent', () => {
  let component: WorkoutPanelComponent;
  let fixture: ComponentFixture<WorkoutPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
