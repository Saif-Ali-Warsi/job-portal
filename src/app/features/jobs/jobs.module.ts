import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CreateJobComponent } from './pages/create-job/create-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditJobComponent } from './pages/edit-job/edit-job.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JobsListComponent,
    JobDetailsComponent,
    CreateJobComponent,
    EditJobComponent
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class JobsModule { }
