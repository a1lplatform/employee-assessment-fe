import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly router: Router,
        private readonly sessionService: SessionService
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    onSignUp() {}

    private initForm(): void {
        this.signUpForm = this.formBuilder.group({
            userName: [null, Validators.required],
            password: [null, Validators.required],
            fullName: [null, Validators.required],
            cccd: [null],
            phoneNo: [null, Validators.required],
            address: [null, Validators.required],
            email: [null, [Validators.email, Validators.required]],
            birthday: [null],
            gender: [null, Validators.required],
            images: [null]
        });
    }
}
