import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Wallet } from 'src/app/services/wallet';
import { WalletService } from 'src/app/services/wallet.service';

export class Validator {
  field: string
  valid: boolean
  message: string
}

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
    private router: Router,
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
      var mnemonicList = this.mnemonics.map((item) => item.word)
      this.wallet.mnemonic = mnemonicList as [string]
      var email = localStorage.getItem('userEmail')
      this.walletService.createWallet(email, this.wallet).subscribe(
        data => {
          this.modalService.dismissAll()
          this.router.navigate(['members']);
          console.log('success', data)
        },
        error => {
          alert(error.data)
          console.log('oops', error)}
      );      
    }
  }

  validation(key: string): any {
    if (key == "name") {
      if (this.wallet.name == undefined ||this.wallet.name.length == 0) {
        return {valid:false, message: 'Name is mandatory'}
      }
    }
    if (key == "password") {
      if (this.wallet.password == undefined ||this.wallet.password.length < 10) {
        return {valid:false, message: "Password can't be less than 10 characters."}
      }
    }    
    return {valid:true, message: null}
  }

  trackByFn(index: any) {
    return index;
  }

}
