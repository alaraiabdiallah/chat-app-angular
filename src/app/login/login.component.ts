import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth = {
    email: '',
    password: ''
  }

  constructor(public authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  login(){
    this.authService.login(this.auth)
    .then(res => this.onLoginSuccess())
    .catch( error => this.openSnackBar(error.message))
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle()
    .then(res => this.onLoginSuccess())
    .catch(error => this.openSnackBar(error.message));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  private onLoginSuccess(){
    this.openSnackBar("Success to login");
    this.router.navigate(['/h']);
  }

}
