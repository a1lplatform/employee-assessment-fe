import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from './services';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up';
import { CalendarModule } from 'primeng/calendar';
import { SharedUiModule } from '@shared/modules';

@NgModule({
    declarations: [LoginComponent, SignUpComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        CalendarModule,
        SharedUiModule
    ],
    providers: [AuthService]
})
export class AuthModule {}
