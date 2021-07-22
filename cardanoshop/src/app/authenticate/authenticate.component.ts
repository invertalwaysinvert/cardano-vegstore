import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private authService: SocialAuthService,
    private router: Router) { }

    user: SocialUser;
    loggedIn: boolean;

    ngOnInit() {
      if (localStorage.getItem('userId') != null) {
        console.log('user is logged');
        this.loggedIn = true;
        this.user = new SocialUser();
      }
      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('photoUrl', user.photoUrl);
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
    this.authService.signOut();
    ['userId', 'userName', 'userEmail', 'photoUrl'].forEach (function (key) { localStorage.removeItem(key); });
    this.activeModal.dismiss();
  }

}
