import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login';
import { AuthService } from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up';
import { SharedUiModule } from '@shared/modules';

@NgModule({
    declarations: [LoginComponent, SignUpComponent],
    imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, SharedUiModule],
    providers: [AuthService]
})
export class AuthModule {}
