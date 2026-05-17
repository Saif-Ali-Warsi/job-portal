import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent {

  constructor(private fb: FormBuilder, private jobsService: JobsService, private router: Router) { }


  jobForm = this.fb.group({
    title: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  })


  onSubmit() {
    if (this.jobForm.invalid) {
      return;
    }

    this.jobsService.createJob(this.jobForm.value).subscribe(() => {
      this.router.navigate(['/jobs']);
    })
  }

}
