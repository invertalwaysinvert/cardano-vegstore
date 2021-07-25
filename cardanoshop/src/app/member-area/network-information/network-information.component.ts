import { Component, OnInit } from '@angular/core';
import { NetworkInformation } from 'src/app/services/network-information';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-network-information',
  templateUrl: './network-information.component.html',
  styleUrls: ['./network-information.component.css']
})
export class NetworkInformationComponent implements OnInit {

  networkInformation = new NetworkInformation()

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.networkInformation.network_tip = {epoch_number: null, slot_number: null}
    this.networkInformation.next_epoch = {epoch_start_time: null, epoch_number: null}
    this.networkInformation.sync_progress = {status:null}
    this.walletService.getNetworkInformation().subscribe(information => {
      this.networkInformation = information
    },
    error => {
      alert(error.data)
      console.log('oops', error)
    });
  }

}
