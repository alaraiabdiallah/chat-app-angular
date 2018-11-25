import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  auth = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  register(){
    this.authService.register(this.auth)
    .then(res => {
      this.openSnackBar("Success to register");
      this.router.navigate(['/login']);
    })
    .catch(error => this.openSnackBar(error.message));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }
}
