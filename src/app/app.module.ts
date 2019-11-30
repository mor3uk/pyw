import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { WorkoutModule } from './workout/workout.module';
import { AppRoutingModule } from './app-routing.module';
import { DatediffPipe } from './results/datediff.pipe';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';
import { ResultsFiltersComponent } from './results/results-filters/results-filters.component';
import { ResultsInfoComponent } from './results/results-info/results-info.component';
import { ResultsItemComponent } from './results/results-item/results-item.component';
import { ResultsListComponent } from './results/results-list/results-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ResultsComponent,
    ResultsFiltersComponent,
    ResultsInfoComponent,
    ResultsItemComponent,
    ResultsListComponent,
    DatediffPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WorkoutModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
