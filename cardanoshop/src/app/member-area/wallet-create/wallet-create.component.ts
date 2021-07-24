import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { NetworkInformation } from 'src/app/services/network-information';
import { Wallet } from 'src/app/services/wallet';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent implements OnInit {

  confirmationPassword: String
  confirmationPasswordValid: Boolean = true
  confirmationMnemonic = []
  confirmationMnemonicValid: Boolean = true
  wallet = new Wallet()
  mnemonics = [];
  recoveryMode = false

  constructor(private walletService: WalletService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.walletService.getMnemonic().subscribe((data: [String]) => {
      this.wallet.mnemonic = data
      this.mnemonics = data.map(word => { return {word: word} })
    });
    this.confirmationMnemonic = [
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null}
    ]
  }

  setMnemonic() {
    this.recoveryMode = true
    this.mnemonics = [
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null},{word:null},
      {word:null}
    ]
  }

  reset() {
    this.wallet.name = null
    this.confirmationPassword = null
    this.wallet.password = null
  }
  
  create(modalData) {
    let options: NgbModalOptions = {
      size: 'lg'
    };
    this.confirmationPasswordValid = !(this.wallet.password != this.confirmationPassword)
    if (this.confirmationPasswordValid) {
      this.modalService.open(modalData, options)
    }
  }

  confirmMnemonic() {
    this.confirmationMnemonicValid = (JSON.stringify(this.mnemonics) == JSON.stringify(this.confirmationMnemonic))
    if (this.confirmationMnemonicValid) {
      this.modalService.dismissAll()
      console.log('ready for creation')
    }
  }

  trackByFn(index: any) {
    return index;
  }

}
