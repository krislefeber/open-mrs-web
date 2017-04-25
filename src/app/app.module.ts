import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PatientService } from './services/patient.service';
import { AppComponent } from './app.component';
import { CovalentCoreModule } from '@covalent/core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CovalentCoreModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
