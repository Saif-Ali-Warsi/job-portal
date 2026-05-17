import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';


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

}
