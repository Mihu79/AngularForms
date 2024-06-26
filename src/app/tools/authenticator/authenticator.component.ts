import { Component,OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor(private bottomSheetRef: MatBottomSheetRef,private router: Router){
    this.firebasetsAuth = new FirebaseTSAuth();
  }
  onReset(
    resetEmail:HTMLInputElement
  ){
    let email = resetEmail.value
    if(this.isNotEmpty(email)){
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: (err) => {
            this.bottomSheetRef.dismiss();
          },
        }
      )
    }
  }


  on_Login(
    loginEmail:HTMLInputElement,
    loginPassword:HTMLInputElement
  ){
    let email = loginEmail.value
    let password = loginPassword.value
    if(this.isNotEmpty(email) && this.isNotEmpty(password)){
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            this.bottomSheetRef.dismiss();
          },
          onFail: (err) => {
            alert(err)
          }
        }
      );
    }
  }


  onRegister(
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement)
  {
    let email = registerEmail.value
    let password = registerPassword.value
    let confirmpassword = registerConfirmPassword.value

    if(
      this.isNotEmpty(email) && 
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmpassword)&&
      this.isAMatch(password, confirmpassword)
    ){
      this.firebasetsAuth.createAccountWith(
      {
        email: email,
        password: password,
        onComplete: (uc) => {
          this.bottomSheetRef.dismiss();
        },
        onFail: (err) => {
          alert("Password should be at least 6 characters.")
        }
      }
    )
    }

    
  }
  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }
  isAMatch(text: string, compareWith: string){
    return text == compareWith;
  }

  onForgotPassword(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }
  onCreateAccount(){
    this.state = AuthenticatorCompState.REGISTER;
  }
  onLogin(){
    this.state = AuthenticatorCompState.LOGIN;
  }
  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgot_PasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:return"Login";
      case AuthenticatorCompState.REGISTER:return"Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:return"Forgot Password";
    }
  }
}
export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}