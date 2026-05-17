import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { CreateJobComponent } from './pages/create-job/create-job.component';
import { EditJobComponent } from './pages/edit-job/edit-job.component';

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent
  },
  {
    path: 'create',
    component: CreateJobComponent
  },
  {
    path: ':id/edit',
    component: EditJobComponent
  },
  {
    path: ':id',
    component: JobDetailsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
