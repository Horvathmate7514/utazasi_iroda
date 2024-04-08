import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { RegistrationModel } from '../registration-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {

  journeys: any[] = [];
  model: RegistrationModel ={
    acceptedConditions: false,
    email: '',
    journeyId: 0,
    lastCovidVaccineDate: '',
    name: '',
    numberOfParticipants: 0
  }
  errirMessage= '';

  constructor(private http: HttpService, private router: Router) { }
  ngOnInit(): void {
   this.http.getDestinations().subscribe( {
    next: (result: any) => this.journeys = result,
    error: (error: any) => console.log(error)
   });
  }
  sendReg(){
    if (!this.model.journeyId) {
      this.errirMessage = 'Válasszon utazást';
      return;
    }
    if (!this.model.name) {
      this.errirMessage = 'Adja meg a nevét.';
      return;
    }
    if (!this.model.email) {
      this.errirMessage = 'Adja meg az email címét.';
      return;
    }
    if (!this.model.numberOfParticipants) {
      this.errirMessage = 'Adja meg a szükséges személyek számát.';
      return;
    }
    if (!this.model.acceptedConditions) {
      this.errirMessage = 'Fogadja el a felteteleket.';
      return;
    }
    this.model.journeyId = Number(this.model.journeyId);
    this.http.sendRegistration(this.model).subscribe({
      next: (result: any) =>{
        alert(`A regisztrációját  ${result.id} sorszámmal rögzítettük`);
        this.router.navigate(['/journeys']);
      } ,
      error: (err: any) => {
        this.errirMessage = err.error?? err.message;
      }
    });
  }
}
