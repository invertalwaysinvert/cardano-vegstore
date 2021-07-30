import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '../services/address';
import { CoingeckoService } from '../services/coingecko.service';
import { Asset, Transaction } from '../services/transaction';
import { TransactionsService } from '../services/transactions.service';
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

  constructor(private router: Router,
    private modalService: NgbModal,
    private coingeckoService: CoingeckoService,
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
    // load ADA price
    if (sessionStorage.getItem('adaPrice') == undefined) {
      this.coingeckoService.getPrices('usd').subscribe(prices => {
        var filtered = prices.filter(value => { return value.symbol == 'ada'})
        if (filtered[0]) {
          sessionStorage.setItem('adaPrice', `${filtered[0].current_price}`);
        }
      })
    }
  }

  get adaPrice(): string {
    return sessionStorage.getItem('adaPrice');
  }

  formatBalance(total): string {

    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    total = total > 0 ? total / 1000000 : 0.00

    var adaPrice = parseFloat(sessionStorage.getItem('adaPrice'))
    return `${total} ADA = ${formatter.format(total * adaPrice)}`
  }

  createWallet() {
    this.router.navigate(['members/wallet-create']);
  }

  receiveAddresses() {
    this.router.navigate(['members/wallet-addresses']);
  }

  transactions() {
    this.router.navigate(['members/wallet-transactions']);
  }

  get user(): User {
    return {
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
      photoUrl: localStorage.getItem('photoUrl')
    }
  }
}
