import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';


@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit {

  savedJobs: any[] = [];

  constructor(private jobService: JobsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadSavedJobs();
  }

  loadSavedJobs() {
    const currentUser = this.authService.currentUser.value;

    this.jobService.getSavedJobs().subscribe((data: any) => {
      this.savedJobs = data.filter((savedJob: any) => {
        return (savedJob.candidateEmail === currentUser?.email)
      })
    })
  }
}
