import { NgModule } from '@angular/core';
import { LoginRoutingModule } from 'login-module/login-routing.module';
import { LoginComponent } from 'login-module/components/login/login.component';
import { SharedModule } from 'shared-module/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
