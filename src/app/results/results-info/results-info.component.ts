import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WorkoutService } from '../../shared/services/workout.service';
import { ResultsService } from '../../shared/services/results.service';
import { Workout } from '../../shared/models/workout.model';

@Component({
  selector: 'app-results-info',
  templateUrl: './results-info.component.html',
  styleUrls: ['./results-info.component.scss']
})
export class ResultsInfoComponent implements OnInit {
  exerciseRoundsGroups: any[] = [];
  workout: Workout;
  id: string;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private router: Router,
    private resultsService: ResultsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ id } = {}) => {
      this.workout = this.workoutService.getWorkout(id);
      this.id = id;
      if (!(id && this.workout.status.completed)) {
        return this.exerciseRoundsGroups = [];
      }
      const result = this.resultsService.getResult(id);
      this.exerciseRoundsGroups = result.exerciseRoundsGroups;
    });
  }

  onRemoveWorkout() {
    this.workoutService.removeWorkout(this.id);
    this.router.navigate(['results']);
  }

}
