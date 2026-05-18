import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Job } from '../models/job.model';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private baseUrl = `${environment.apiUrl}/jobs`

  constructor(private http: HttpClient) { }


  getJobs() {
    return this.http.get(this.baseUrl);
  }

  getJobById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  createJob(jobData: any) {
    return this.http.post(this.baseUrl, jobData)
  }

  updateJob(id: string, jobData: any) {
    return this.http.put(`${this.baseUrl}/${id}`, jobData)
  }

  deleteJob(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  searchJobs(searchTerm: string) {
    return this.http.get(
      `${this.baseUrl}?q=${searchTerm}`
    )
  }

  applyJob(applicationData: any) {
    return this.http.post(
      `${environment.apiUrl}/applications`, applicationData
    )
  }

  getApplications() {
    return this.http.get(`${environment.apiUrl}/applications`)
  }

}
