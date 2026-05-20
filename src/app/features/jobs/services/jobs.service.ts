import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Job } from '../models/job.model';
import { shareReplay, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private baseUrl = `${environment.apiUrl}/jobs`


  constructor(private http: HttpClient) { }

  job$ = this.http.get(this.baseUrl).pipe(
    tap(() => {
      console.log('API CALL EXECUTED')
    }),
    shareReplay(1)
  )


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

  saveJob(data: any) {
    return this.http.post(`${environment.apiUrl}/savedJobs`, data)
  }

  getSavedJobs() {
    return this.http.get(`${environment.apiUrl}/savedJobs`)
  }

}
