import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job!: Job

  constructor(private route: ActivatedRoute, private jobService: JobsService) { }

  ngOnInit(): void {

    const jobId = this.route.snapshot.paramMap.get('id');

    if (jobId) {
      this.loadJob(jobId)
    }

  }


  loadJob(id: string) {
    this.jobService.getJobById(id).subscribe((data: any) => {
      this.job = data;
    })
  }
}
