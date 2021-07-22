import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { environment } from './../environments/environment';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { MemberAreaComponent } from './member-area/member-area.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WalletCreateComponent } from './member-area/wallet-create/wallet-create.component';
import { HeaderComponent } from './homepage/header/header.component';
import { FooterComponent } from './homepage/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticateComponent,
    MemberAreaComponent,
    HomepageComponent,
    WalletCreateComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LightboxModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.client_id
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
