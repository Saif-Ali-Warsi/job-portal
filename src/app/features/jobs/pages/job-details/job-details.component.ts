import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  job!: Job

  constructor(private route: ActivatedRoute,
    private jobService: JobsService,
    private authService: AuthService,
    private toast: ToastService
  ) { }

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

  applyJob() {

    const currentUser = this.authService.currentUser.value;

    if (!currentUser) {
      return;
    }

    const applicationData = {
      jobId: this.job.id,
      candidateEmail: currentUser.email,
      candidateName: currentUser.email,
      appliedAt: new Date().toISOString()
    }

    this.jobService.applyJob(applicationData).subscribe(() => {
      this.toast.show(
        'Application Submitted'
      )
    })


  }
}
