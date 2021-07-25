import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorage } from '../helpers/session-storage';
import { NetworkInformation } from '../services/network-information';
import { User } from '../services/user';
import { Wallet } from '../services/wallet';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  wallet: Wallet

  constructor(private router: Router,
    private walletService: WalletService) { 
  }

  ngOnInit(): void {
    var email = localStorage.getItem('userEmail');
    this.walletService.getWallet(email).subscribe(data => {
      console.log(data)
      this.wallet = data
    },
    error => {
      alert(error.data)
      console.log('oops', error)
    });
  }

  createWallet() {
    this.router.navigate(['members/wallet-create']);
  }
  
  get user(): User {
    return {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      photoUrl: localStorage.getItem('photoUrl')
    }
  }
}
