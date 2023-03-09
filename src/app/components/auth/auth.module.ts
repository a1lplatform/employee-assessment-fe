import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from "./components/login";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { AuthService } from "./services";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [LoginComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule
    ],
    providers: [AuthService]
})
export class AuthModule { }
