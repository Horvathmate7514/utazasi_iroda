import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journeys',
  templateUrl: './journeys.component.html',
  styleUrl: './journeys.component.css'
})
export class JourneysComponent {

  journeys: any[] = [];
  constructor(private httpService: HttpService, private router: Router) { }


  ngOnInit(): void {
   this.httpService.getJourneys().subscribe( {
    next: (result: any) => this.journeys = result,
    error: (error: any) => console.log(error)
   });
  }
}
