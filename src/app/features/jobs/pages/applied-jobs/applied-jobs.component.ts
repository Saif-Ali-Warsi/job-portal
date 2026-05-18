import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.scss']
})
export class AppliedJobsComponent implements OnInit {

  applications: any[] = [];

  constructor(private jobService: JobsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications() {
    const currentUser = this.authService.currentUser.value;

    this.jobService.getApplications().subscribe((data: any) => {

      this.applications = data.filter((application: any) => {
        return (application.candidateEmail === currentUser?.email)
      })

    })

  }
}
