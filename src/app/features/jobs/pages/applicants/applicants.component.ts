import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {

  applicants: any[] = [];

  constructor(private jobService: JobsService) { }


  ngOnInit(): void {

    this.loadApplicants();

  }

  loadApplicants() {
    forkJoin({
      jobs: this.jobService.getJobs(),

      applications: this.jobService.getApplications()
    }).subscribe((response: any) => {
      const jobs = response.jobs;

      const applications = response.applications;

      this.applicants = applications.map(
        (application: any) => {
          const matchedJob = jobs.find(
            (job: any) => {
              return (job.id === application.jobId);

            });

          return {
            ...application,
            jobTitle: matchedJob?.title,
            company: matchedJob?.company
          }
        }
      )
    })

  }

}
