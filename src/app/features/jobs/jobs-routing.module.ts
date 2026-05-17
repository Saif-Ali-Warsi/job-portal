import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';
import { JobDetailsComponent } from './pages/job-details/job-details.component';

const routes: Routes = [
  {
    path: '',
    component: JobsListComponent
  },
  {
    path: ':id',
    component: JobDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
