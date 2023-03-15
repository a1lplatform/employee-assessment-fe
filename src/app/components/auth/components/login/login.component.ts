import { Component, OnInit } from '@angular/core';
import { UnSubscribable } from '@shared/directives';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';
import { AppRoutes } from '@shared/enums';
import { finalize, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', '../../../../../assets/themes/spinner.scss']
})
export class LoginComponent extends UnSubscribable implements OnInit {
    isLoadingBtn!: boolean;
    loginForm!: FormGroup;
    isLoading!: boolean;

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly sessionService: SessionService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
    }

    onLogin(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const loginValue = {
            ...this.loginForm.value
        };
        this.isLoading = true;
        this.authService
            .login(loginValue)
            .pipe(
                takeUntil(this.unsubscribeAll),
                finalize(() => (this.isLoading = false))
            )
            .subscribe({
                next: (res) => {
                    this.sessionService.rememberInfo(res);
                    if (this.sessionService.isAdmin()) {
                        this.router.navigate(['', AppRoutes.DashBoard]);
                    } else {
                        this.router.navigate(['', AppRoutes.Search]);
                    }
                },
                error: (err: any) => {}
            });
    }

    goToSignUp() {
        this.router.navigate(['', AppRoutes.SignUp]);
    }

    private initForm(): void {
        this.loginForm = this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });
    }
}
