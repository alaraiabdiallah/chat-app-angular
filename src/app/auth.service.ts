import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    console.log(this.getUserFromCache());
    this.currentUser = this.getUserFromCache();
  }

  login(credential){
    let c = credential;
    return new Promise<any>((resolve,reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(c.email, c.password)
        .then(res => {
          localStorage.setItem('currentUser',JSON.stringify(this.afAuth.auth.currentUser));
          this.currentUser = this.getUserFromCache();
          console.log(res);
          resolve(res);
        })
        .catch(error => {
          console.log(error);
          reject(error); 
        })
    });
  }

  isGuest(){
    return (!this.currentUser)? true: false;
  }

  register(credential){
    let c = credential;
    return new Promise<any>((resolve,reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(c.email, c.password)
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  }

  loginWithGoogle(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider;
      this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem('currentUser', JSON.stringify(result.user));
        this.currentUser = this.getUserFromCache();
        console.log(result.user);
        resolve(result.user);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
    })
  }

  logoutThenRedirect(redirectTo){
    return new Promise<any>((resolve, reject) => {
      this.logout()
        .then(res => {
          resolve(res);
          this.router.navigate(redirectTo)
        }).catch(err => reject(err));
    })
  }

  logout(){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signOut()
      .then(res => {
        localStorage.removeItem('currentUser');
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      })
    });
  }


  private getUserFromCache(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
