import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/services/address';
import { Asset, Transaction } from 'src/app/services/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { WalletService } from 'src/app/services/wallet.service';

interface Detail {
  destination_address: string,
  origin_address: string,
  ada_amount: number,
  assets: Array<Asset>
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactions: [Transaction]
  addresses: [Address]

  constructor(private transactionService: TransactionsService, 
    private router: Router,
    private walletService: WalletService) { }

  ngOnInit(): void {
    var email = localStorage.getItem('userEmail');
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

  get outcomingTransactions(): Transaction[] {
    return this.transactions.filter(item => {return item.direction == "outcoming"})
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

  back() {
    this.router.navigate(['members']);
  }
}
