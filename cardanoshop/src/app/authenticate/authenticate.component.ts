import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { SessionStorage } from '../helpers/session-storage';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private authService: SocialAuthService,
    private loginService: LoginService,
    public session: SessionStorage,
    private router: Router) { }

    user: SocialUser;
    loggedIn: boolean = false;
    userpasswordAuth = false;
    // only for username password form
    userEmail: string
    userPassword: string

    ngOnInit() {
      if (this.session.currentUser != null) {
        console.log('user is logged');
        this.loggedIn = true;
        this.user = new SocialUser();
      }
      this.authService.authState.subscribe((socialUser) => {
        if (socialUser && socialUser.email) {
          this.user = socialUser;
          this.loggedIn = (socialUser != null);
          this.loginService.login(socialUser.email)
            .subscribe(accessToken => {
              this.session.currentUser = socialUser.email
              if (environment.production == false) {
                localStorage.setItem('accessToken', accessToken);
              }
              localStorage.setItem('userId', socialUser.id);
              localStorage.setItem('userName', socialUser.name);
              localStorage.setItem('userEmail', socialUser.email);
              localStorage.setItem('photoUrl', socialUser.photoUrl);
            })
        } else {
          alert('You are not authorized to see this content.')
        }
        
      });
    }

  openMemberArea(): void {
    this.activeModal.dismiss();
    this.router.navigate(['members']);
  }

  signUserPassword(): void {
    if (this.userEmail) {
      this.loginService.login(this.userEmail)
      .subscribe(accessToken => {
        this.user = new SocialUser();
        this.user.email = this.userEmail
        this.session.currentUser = this.userEmail
        if (environment.production == false) {
          localStorage.setItem('accessToken', accessToken);
        }
        localStorage.setItem('userEmail', this.userEmail);
        localStorage.setItem('userId', this.userEmail);
        localStorage.setItem('userName', this.userEmail);
        localStorage.setItem('photoUrl', 'assets/img/userpicture.png');
        this.loggedIn = true
      })
    }
  }

  validation(key: string): any {
    if (key == "name") {
      if (this.userEmail == undefined ||this.userEmail.length == 0) {
        return {valid:false, message: 'Email is mandatory'}
      }
    }
    if (key == "password") {
      if (this.userPassword == undefined ||this.userPassword.length < 10) {
        return {valid:false, message: "Password is mandatory."}
      }
    }
    return {valid:true, message: null}
  }


  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.session.currentUser = null
    this.session.accessToken = null
    sessionStorage.clear()
    this.authService.signOut();
    ['userId', 'userName', 'userEmail', 'photoUrl'].forEach (function (key) { localStorage.removeItem(key); });
    this.activeModal.dismiss();
  }

}
