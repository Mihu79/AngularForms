import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FirebaseTSApp } from'firebasets/FirebaseTSApp/firebaseTSApp';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { MatCardModule} from '@angular/material/card';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenticatorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig)
  }
 }
