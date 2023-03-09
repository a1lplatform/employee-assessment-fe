import { Component, OnInit } from '@angular/core';
import { UnSubscribable } from "@shared/directives";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services";
import { Routes } from "@shared/enums";
import { finalize, takeUntil } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends UnSubscribable implements OnInit {
    isLoadingBtn!: boolean;
    loginForm!: FormGroup;
    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    onLogin(): void {
        const loginValue = {
            ...this.loginForm.value,
        }
        this.isLoadingBtn = true
        this.authService.login(loginValue)
        .pipe(
            takeUntil(this.unsubscribeAll),
            finalize(() => this.isLoadingBtn = false)

        )
        .subscribe({
            next: (res) => {
                console.log(res)
                this.router.navigate(['', Routes.DashBoard]);
            },
            error: (err: any) => {
            }
        })
    }

    private initForm(): void {
        this.loginForm = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required],
        })
    }

}
