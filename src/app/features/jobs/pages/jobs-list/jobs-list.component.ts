import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  jobs: Job[] = [];

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe((data: any) => {
      this.jobs = data
    });
  }


  deleteJob(id: any) {

    const confirmed = confirm('Are you sure?');

    if (!confirmed) {
      return;
    }

    this.jobService.deleteJob(id).subscribe(() => {
      this.loadJobs();
    })

  }

}
