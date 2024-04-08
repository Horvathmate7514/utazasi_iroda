import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationModel } from './registration-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

APIURl = 'https://utazasi-iroda.jedlik.cloud';
  constructor(private http: HttpClient) { }

  getDestinations(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURl + '/api/journeys/short');
  }

  sendRegistration(model: RegistrationModel): Observable<any> {
    return this.http.post(this.APIURl + '/api/reserve', model);
  }

  getJourneys(): Observable<any[]> {
    return this.http.get<any[]>(this.APIURl + '/api/journeys');
  }
}
