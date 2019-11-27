import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { WorkoutModule } from './workout/workout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';
import { ResultsListComponent } from './results/results-list/results-list.component';
import { ResultsFiltersComponent } from './results/results-filters/results-filters.component';
import { ResultsItemComponent } from './results/results-item/results-item.component';
import { ResultsInfoComponent } from './results/results-info/results-info.component';
import { DatediffPipe } from './shared/pipes/datediff.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    ResultsListComponent,
    ResultsFiltersComponent,
    ResultsItemComponent,
    ResultsInfoComponent,
    DatediffPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxTrimDirectiveModule,
    WorkoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
