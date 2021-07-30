import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Address } from 'src/app/services/address';
import { WalletService } from 'src/app/services/wallet.service';
import { AddressViewComponent } from './address-view.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: [Address]

  constructor(private router: Router,
    private walletService: WalletService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    var email = localStorage.getItem('userEmail');
    this.walletService.getAddresses(email).subscribe(data => {
      this.addresses = data
    },
    error => {
      alert(error.data)
      console.log('oops', error)
    });
  }

  showAddress(address) {
    let options: NgbModalOptions = {
      size: 'sm'
    };
    const modal = this.modalService.open(AddressViewComponent, options)
    modal.componentInstance.address = address
  }

  back() {
    this.router.navigate(['members']);
  }
}
