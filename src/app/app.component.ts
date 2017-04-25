import { Component, OnInit } from '@angular/core';
import { PatientService } from './services/patient.service';
import {Patient} from './dto/patient';
import { StressTestResult } from './dto/StressTestResult';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  list:[Patient, StressTestResult[]] = [,[]];

  constructor(private patientService:PatientService){}

  ngOnInit() {
    this.getTests();
  }

  getTests() {
    let self = this;
    this.patientService.getAllPatients().then((patients)=> {
      patients.forEach((patient) => {
        self.patientService.getStressTestData(patient.uuid).then((data) => {
          self.list.push(patient,data);
        });
      });
    });
  }
}
