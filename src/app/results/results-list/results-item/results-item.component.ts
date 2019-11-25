import { Component, OnInit, Input } from '@angular/core';

import { Workout } from '../../../shared/models/workout.model';
import { generateDateMessage } from '../../../shared/utils/date-message.util';
import { ResultsService } from '../../results.service';

@Component({
  selector: 'app-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.scss']
})
export class ResultsItemComponent implements OnInit {
  @Input() workout: Workout;
  idPicked: string;

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.resultsService.workoutResultPicked
      .subscribe((workout) => this.idPicked = workout.id);
  }

  dateMessage(timestamp: number) {
    return generateDateMessage(timestamp);
  }

  onPickResult() {
    this.resultsService.workoutResultPicked
      .next(this.workout);
  }

}
