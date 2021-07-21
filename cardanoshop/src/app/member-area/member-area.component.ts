import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  createWallet() {
    this.router.navigate(['members/wallet-create']);
  }

  recoverWallet() {
    this.router.navigate(['members/wallet-recover']);
  }
}
