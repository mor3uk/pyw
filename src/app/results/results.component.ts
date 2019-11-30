import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  providers: [FilterService],
})
export class ResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
