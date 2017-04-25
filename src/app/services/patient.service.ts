import { Injectable } from '@angular/core';
import { Patient } from '../dto/patient';
import { Http } from '@angular/http';
@Injectable()
export class PatientService {

  constructor(private http:Http) { }

  getPatient(uuid:string) {
    this.http
  }
}
