import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { FormControl } from '@angular/forms';
import { startWith, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  jobs: Job[] = [];
  allJobs: Job[] = [];

  searchControl = new FormControl('');

  locationControl = new FormControl('')

  companyControl = new FormControl('')

  constructor(private jobService: JobsService) { }

  ngOnInit(): void {
    this.loadJobs();

    combineLatest([
      this.searchControl.valueChanges.pipe(
        startWith('')
      ),

      this.locationControl.valueChanges.pipe(
        startWith('')
      ),

      this.companyControl.valueChanges.pipe(
        startWith('')
      )

    ]).pipe(takeUntil(this.destroy$)).subscribe(([search, location, company]) => {

      const searchText = search?.toLowerCase() || '';

      this.jobs = this.allJobs.filter((job: any) => {

        const matchesSearch = job.title.toLowerCase().includes(searchText)

          ||

          job.company.toLowerCase().includes(searchText) || job.location.toLowerCase().includes(searchText)

        const matchesLocation = !location || job.location === location;

        const matchesCompany = !company || job.company === company;

        return (
          matchesSearch && matchesLocation && matchesCompany
        )

      })

    })


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

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
