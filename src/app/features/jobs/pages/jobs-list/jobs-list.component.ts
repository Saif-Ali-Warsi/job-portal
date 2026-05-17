import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  jobs: Job[] = [];
  allJobs: Job[] = [];

  searchControl = new FormControl('');

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.loadJobs();

    this.searchControl.valueChanges.pipe(

      debounceTime(500),

      distinctUntilChanged()

    ).subscribe(value => {

      const search =
        value?.toLowerCase() || '';

      this.jobs = this.allJobs.filter((job: any) => {

        return (
          job.title.toLowerCase().includes(search) ||

          job.company.toLowerCase().includes(search) ||

          job.location.toLowerCase().includes(search)
        );

      });

    });
  }

  loadJobs() {
    this.jobService.getJobs().subscribe((data: any) => {
      this.jobs = data

      this.allJobs = data;
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
