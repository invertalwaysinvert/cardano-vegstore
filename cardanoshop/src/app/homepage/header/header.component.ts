import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
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
    private authService: SocialAuthService,
    private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userId') != null) {
      console.log('user is logged');
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
    }
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
