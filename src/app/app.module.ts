import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WorkoutModule } from './workout/workout.module';
import { ResultsModule } from './results/results.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WorkoutModule,
    ResultsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
