import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';


@NgModule({
  declarations: [
    JobsListComponent,
    JobDetailsComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
