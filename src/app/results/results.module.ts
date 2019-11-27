import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { ResultsComponent } from './results.component';
import { ResultsFiltersComponent } from './results-filters/results-filters.component';
import { ResultsInfoComponent } from './results-info/results-info.component';
import { ResultsItemComponent } from './results-item/results-item.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { DatediffPipe } from '../shared/pipes/datediff.pipe';
import { WorkoutResultsModule } from '../shared/modules/workout-results.module';

@NgModule({
  declarations: [
    ResultsComponent,
    ResultsFiltersComponent,
    ResultsInfoComponent,
    ResultsItemComponent,
    ResultsListComponent,
    DatediffPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgxTrimDirectiveModule,
    WorkoutResultsModule,
  ],
  exports: [],
  providers: [],
})
export class ResultsModule { }