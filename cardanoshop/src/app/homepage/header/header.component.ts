import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
import { SessionStorage } from 'src/app/helpers/session-storage';
import { LoginService } from 'src/app/login.service';
import { AuthenticateComponent } from '../../authenticate/authenticate.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  closeModal: string;
  loggedIn: boolean;
  userName: string;

  constructor(private modalService: NgbModal, 
    public environment: SessionStorage,
    private loginService: LoginService,
    private authService: SocialAuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (this.environment.currentUser != null && localStorage.getItem('userId') != null) {
      console.log('user is logged');
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
    }
    this.authService.authState.subscribe((socialUser) => {
      if (socialUser && socialUser.email) {
        this.loggedIn = (socialUser != null);
        this.loginService.login(socialUser.email)
          .subscribe(accessToken => {
            this.environment.currentUser = socialUser.email
            this.loggedIn = (accessToken != null);
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

  triggerModal() {
    this.modalService.open(AuthenticateComponent, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openMemberArea(): void {
    this.router.navigate(['members']);
  }

  signOut(): void {
    this.authService.signOut();
    ['userId', 'userName', 'userEmail', 'photoUrl'].forEach (function (key) { localStorage.removeItem(key); });
    this.router.navigate(['']);
  }

}
