import { Injectable } from '@angular/core';
import { Patient } from '../dto/patient';
import { StressTestResult } from '../dto/StressTestResult';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'
@Injectable()
export class PatientService {
  username = "admin";
  password = "Admin123";

  constructor(private http: Http) { }

  getPatient(uuid: string): Promise<Patient> {
    return new Promise<Patient>((resolve, error) => {
      return this.http.get("http://192.168.64.138:8080/openmrs/ws/rest/v1/person/" + uuid, { headers: this.getHeaders() }).toPromise().then((response) => {
        resolve(response.json());
      }).catch((err) => {
        console.log(err);
      });
    });
  }
  getAllPatients(): Promise<Patient[]> {
    return new Promise<Patient[]>((resolve, error) => {
      return this.http.get("http://192.168.64.138:8080/openmrs/ws/rest/v1/person?q=", { headers: this.getHeaders() }).toPromise().then((response) => {
        resolve(response.json().results);
      }).catch((err) => {
        console.log(err);
      });
    });
  }
  getStressTestData(uuid: string): Promise<StressTestResult[]> {
    let self = this;
    return new Promise<StressTestResult[]>((resolve, error) => {
      return this.http.get("http://192.168.64.138:8080/openmrs/ws/rest/v1/obs?patient=" + uuid + "&v=full", { headers: this.getHeaders() }).
        toPromise().then((response) => {
          let rows: any[] = response.json().results;
          let testResults: StressTestResult[] = [];
          if(rows.length === 0) {
            resolve([]);
            return;
          }
          rows.forEach((row) => {
            let d = new Date(row.obsDatetime);
            if (row.display.includes("Heart")) {
              let matchingDay = testResults.filter((test) => {
                return self.sameDayOfYear(test.obsDatetime, d);
              })[0];
              if (matchingDay === undefined) {
                matchingDay = {
                  obsDatetime: new Date(row.obsDatetime),
                  heartRate: parseInt(row.display.split(":")[1])
                }
                testResults.push(matchingDay);
              } else
                matchingDay[0].heartRate = parseInt(row.display.split(":")[1]);
            } else if (row.display.includes("Systolic")) {
              let matchingDay = testResults.filter((test) => {
                return self.sameDayOfYear(test.obsDatetime, d);
              })[0];
              if (matchingDay === undefined) {
                matchingDay = {
                  obsDatetime: new Date(row.obsDatetime),
                  systolicPressure: parseInt(row.display.split(":")[1])
                }
                testResults.push(matchingDay);
              } else
                matchingDay.systolicPressure = parseInt(row.display.split(":")[1]);
            }
            resolve(testResults);
          });
        }).catch((err) => {
          console.log(err);
        });
    });
  }
  sameDayOfYear(d1: Date, d2: Date): boolean {
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
  }
  getHeaders(): Headers {
    let h = new Headers();
    h.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    h.append("Content-Type", "application/json");
    return h;
  }
}
