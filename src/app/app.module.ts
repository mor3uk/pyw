import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

import { WorkoutModule } from './workout/workout.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-intercepter.service';
import { DatediffPipe } from './results/datediff.pipe';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ResultsComponent } from './results/results.component';
import { ResultsFiltersComponent } from './results/results-filters/results-filters.component';
import { ResultsInfoComponent } from './results/results-info/results-info.component';
import { ResultsItemComponent } from './results/results-item/results-item.component';
import { ResultsListComponent } from './results/results-list/results-list.component';
import { AuthComponent } from './auth/auth.component';

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
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    AppRoutingModule,
    WorkoutModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
