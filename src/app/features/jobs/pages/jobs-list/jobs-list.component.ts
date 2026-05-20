import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { Job } from '../../models/job.model';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject, from, forkJoin } from 'rxjs';
import { startWith, takeUntil, mergeMap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();

  jobs: Job[] = [];
  allJobs: Job[] = [];

  selectedJobsIds: number[] = [];

  searchControl = new FormControl('');

  locationControl = new FormControl('')

  companyControl = new FormControl('')

  constructor(private jobService: JobsService, private toast: ToastService) { }

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

        const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase())

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

  toggleSelection(id: any) {
    const exists = this.selectedJobsIds.includes(id);

    if (exists) {
      this.selectedJobsIds = this.selectedJobsIds.filter(
        jobId => jobId !== id
      )
    } else {
      this.selectedJobsIds.push(id);
    }
  }

  bulkDelete() {
    if (this.selectedJobsIds.length === 0) {
      return;
    }

    const requests = this.selectedJobsIds.map(
      (id: any) => {
        return this.jobService.deleteJob(id)
      }
    )

    forkJoin(requests).subscribe(() => {
      this.loadJobs();

      this.selectedJobsIds = [];

      this.toast.show('Selected Jobs Deleted')
    })


  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
