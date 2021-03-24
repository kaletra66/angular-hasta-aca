import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficalComponent } from './grafical/grafical.component';
import { PagesComponent } from './pages.component';
import { ShareModule } from '../share/share.module';

import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    GraficalComponent,
    PagesComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    GraficalComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AppRoutingModule
  ]
})
export class PagesModule { }
