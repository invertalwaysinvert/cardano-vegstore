import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddressListComponent } from './member-area/address-view/address-list.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { TransactionsComponent } from './member-area/transactions/transactions.component';
import { WalletCreateComponent } from './member-area/wallet-create/wallet-create.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'members', component: MemberAreaComponent },
  { path: 'members/wallet-create', component: WalletCreateComponent },
  { path: 'members/wallet-addresses', component: AddressListComponent },
  { path: 'members/wallet-transactions', component: TransactionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
