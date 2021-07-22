import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
import { SessionStorage } from '../helpers/session-storage';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private authService: SocialAuthService,
    private loginService: LoginService,
    public environment: SessionStorage,
    private router: Router) { }

    user: SocialUser;
    loggedIn: boolean;

    ngOnInit() {
      if (this.environment.currentUser != null) {
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
              this.environment.currentUser = socialUser.email
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

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.environment.currentUser = null
    this.environment.accessToken = null
    sessionStorage.clear()
    this.authService.signOut();
    ['userId', 'userName', 'userEmail', 'photoUrl'].forEach (function (key) { localStorage.removeItem(key); });
    this.activeModal.dismiss();
  }

}
