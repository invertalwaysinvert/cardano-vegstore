import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { WalletCreateComponent } from './member-area/wallet-create/wallet-create.component';
import { WalletRecoverComponent } from './member-area/wallet-recover/wallet-recover.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'members', component: MemberAreaComponent },
  { path: 'members/wallet-create', component: WalletCreateComponent },
  { path: 'members/wallet-recover', component: WalletRecoverComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
