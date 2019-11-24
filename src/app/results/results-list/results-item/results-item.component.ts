import { Component, OnInit, Input } from '@angular/core';

import { Workout } from '../../../shared/models/workout.model';
import { generateDateMessage } from '../../../shared/utils/date-message.util';

@Component({
  selector: 'app-results-item',
  templateUrl: './results-item.component.html',
  styleUrls: ['./results-item.component.scss']
})
export class ResultsItemComponent implements OnInit {
  @Input() workout: Workout;

  constructor() { }

  ngOnInit() {
  }

  dateMessage(timestamp: number) {
    return generateDateMessage(timestamp);
  }

}
