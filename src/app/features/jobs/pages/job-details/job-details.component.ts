import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Subject } from 'rxjs';
import { map, exhaustMap, concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  applyClick$ = new Subject<void>();
  saveClick$ = new Subject<void>();

  job!: Job;

  alreadyApplied = false;

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

    this.checkApplicationStatus();

    this.applyClick$
      .pipe(

        exhaustMap(() => {

          const currentUser =
            this.authService.currentUser.value;

          const applicationData = {

            jobId: this.job.id,

            candidateEmail:
              currentUser?.email,

            candidateName:
              currentUser?.email,

            appliedAt:
              new Date().toISOString()

          };

          return this.jobService
            .applyJob(applicationData);

        })

      )
      .subscribe(() => {

        this.toast.show(
          'Application Submitted'
        );

        this.alreadyApplied = true;

      });

    this.saveClick$.pipe(
      concatMap(() => {
        const currentUser = this.authService.currentUser.value;

        const savedData = {
          jobId: this.job.id,
          candidateEmail:
            currentUser?.email,
          savedAt:
            new Date().toISOString()
        }
        return this.jobService.saveJob(savedData);
      })
    ).subscribe(() => {
      this.toast.show('Job Saved')
    })
  }

  loadJob(id: string) {
    this.jobService.getJobById(id).subscribe((data: any) => {
      this.job = data;
    })
  }

  checkApplicationStatus() {
    const currentUser = this.authService.currentUser.value;

    if (!currentUser || !this.job?.id) {
      return;
    }

    this.jobService.getApplications().pipe(
      map((applications: any) => {
        return applications.some(
          (applications: any) => {
            return (applications.jobId === this.job.id && applications.candidateEmail === currentUser.email)
          }
        )
      })
    ).subscribe((alreadyApplied) => {
      this.alreadyApplied = alreadyApplied;
    })
  }

  applyJob() {
    this.applyClick$.next();
  }

  saveJob() {
    this.saveClick$.next();
  }
}
