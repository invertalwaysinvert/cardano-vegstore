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

interface Detail {
  destination_address: string,
  origin_address: string,
  ada_amount: number,
  assets: Array<Asset>
}

@Component({
  selector: 'app-member-area',
  templateUrl: './member-area.component.html',
  styleUrls: ['./member-area.component.css']
})
export class MemberAreaComponent implements OnInit {

  wallet: Wallet
  addresses: [Address]
  transactions: [Transaction]

  constructor(private router: Router,
    private modalService: NgbModal,
    private coingeckoService: CoingeckoService,
    private walletService: WalletService,
    private transactionService: TransactionsService) { 
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
    // wallet addresses
    this.walletService.getAddresses(email).subscribe(data => {
      this.addresses = data
    },
    error => {
      alert(error.data)
      console.log('oops', error)
    });
    // wallet transactions
    this.transactionService.getTransactions(email).subscribe(data => {
      this.transactions = data
    })

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

  get incomingTransactions(): Transaction[] {
    var incoming = this.transactions?.filter(item => {return item.direction == "incoming"})
    incoming?.filter(item => {
      // filter outputs by address
      return item.outputs.filter(output => {
        // filter wallet addresses
        return this.addresses.filter(address => {
          return address.id == output.address
        }).length > 0
      }).length > 0
    })
    return incoming
  }

  detailTransaction(transaction: Transaction): Detail[] {
    var output1 = transaction.outputs[0]
    var output2 = transaction.outputs[1]

    var unit = output1.amount.unit
    var detail: Detail = {
      origin_address: null,
      destination_address: null,
      ada_amount: 0,
      assets: Array<Asset>()
    }
    if (unit == 'lovelace') {
      var total = output1.amount.quantity > 0 ? output1.amount.quantity / 1000000 : 0.00
      var address = `${String(output1.address.substring(0,55))}...`
      var origin_address = `${String(output2.address.substring(0,55))}...`

      detail.destination_address = address
      detail.origin_address = origin_address
      detail.ada_amount = total
    }
    if (output1.assets.length > 0) {
      detail.assets = new Array<Asset>(0).fill(null);
      output1.assets.forEach(asset => {
        detail.assets.push({
          asset_name: asset.asset_name,
          quantity: asset.quantity,
          policy_id: `${asset.policy_id.substring(0,35)}...`
        })
      })
      /*
      output.assets.forEach(asset => {  
        detail.assets.concat({
          asset_name: asset.asset_name,
          quantity: asset.quantity,
          policy_id: asset.policy_id.substring(0,25)
        })
      });
      */

    }
    return [detail]
  }

  get outcomingTransactions(): Transaction[] {
    return this.transactions.filter(item => {return item.direction == "outcoming"})
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
