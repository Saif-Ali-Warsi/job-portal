import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {


  jobId = '';

  constructor(private fb: FormBuilder,
    private jobService: JobsService,
    private route: ActivatedRoute,
    private router: Router) { }


  jobForm = this.fb.group({
    title: ['', Validators.required],
    company: ['', Validators.required],
    location: ['', Validators.required],
    salary: ['', Validators.required],
    description: ['', Validators.required],
  })

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.jobId = id;
      this.loadJob(id)
    }

  }

  loadJob(id: string) {
    this.jobService.getJobById(id).subscribe((data: any) => {
      this.jobForm.patchValue(data);
    })
  }


  onSubmit() {

    if (this.jobForm.invalid) {
      return;
    }

    this.jobService.updateJob(this.jobId, this.jobForm.value).subscribe(() => {
      this.router.navigate(['/jobs']);
    })
  }
}
