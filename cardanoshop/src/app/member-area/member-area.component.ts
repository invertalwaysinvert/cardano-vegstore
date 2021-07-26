import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../services/address';
import { User } from '../services/user';
import { Wallet } from '../services/wallet';
import { WalletService } from '../services/wallet.service';
import { AddressViewComponent } from './address-view/address-view.component';

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  wallet: Wallet
  addresses: [Address]

  constructor(private router: Router,
    private modalService: NgbModal,
    private walletService: WalletService) { 
  }

  ngOnInit(): void {
    var email = localStorage.getItem('userEmail');
    this.walletService.getWallet(email).subscribe(data => {
      if (data.name) {
        this.wallet = data
      }
    },
    error => {
      alert(error.data)
      console.log('oops', error)
    });
    this.walletService.getAddresses(email).subscribe(data => {
      this.addresses = data
    },
    error => {
      alert(error.data)
      console.log('oops', error)
    });
  }

  createWallet() {
    this.router.navigate(['members/wallet-create']);
  }
  
  showAddress(address) {
    let options: NgbModalOptions = {
      size: 'sm'
    };
    const modal = this.modalService.open(AddressViewComponent, options)
    modal.componentInstance.address = address
  }

  get user(): User {
    return {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      photoUrl: localStorage.getItem('photoUrl')
    }
  }
}
