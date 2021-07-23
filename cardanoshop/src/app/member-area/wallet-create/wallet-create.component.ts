import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  confirmationMnemonic: String
  confirmationMnemonicValid: Boolean = true
  wallet = new Wallet()

  constructor(private walletService: WalletService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.walletService.getMnemonic().subscribe((data: [String]) => this.wallet.mnemonic = data.join(' '));
  }

  reset() {}
  
  create(modalData) {
    this.confirmationPasswordValid = !(this.wallet.password != this.confirmationPassword)
    if (this.confirmationPasswordValid) {
      this.modalService.open(modalData, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      }, (res) => {
      });
    }
  }

  confirmMnemonic() {
    this.confirmationMnemonicValid = !(this.wallet.mnemonic != this.confirmationMnemonic)
    if (this.confirmationMnemonicValid) {
      this.modalService.dismissAll()
      console.log('ready for creation')
    }
  }


}
