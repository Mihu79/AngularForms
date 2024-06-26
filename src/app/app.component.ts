import { Component } from '@angular/core';
import { AuthenticatorComponent } from './tools/authenticator/authenticator.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'social_app';
  
 
  
  constructor(private loginSheet:MatBottomSheet){
  
}

  onGetStartedClick() {
    this.loginSheet.open(AuthenticatorComponent);
  
  }
}
