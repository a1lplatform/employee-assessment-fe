import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services';
import { GenderConstant } from '@shared/constants';
import { Range } from '../../models';
import { AuthService } from '../../services';
import { UnSubscribable } from '@shared/directives';
import { switchMap, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CommonHelper } from '@shared/helper';
import { endOfDay, format } from 'date-fns';
import { AppRoutes, RangeEnum, Roles } from '@shared/enums';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends UnSubscribable implements OnInit {
    readonly gender = GenderConstant;
    selectedGender!: any;
    signUpForm!: FormGroup;
    rangeData!: Range[];
    selectedFiles: any = [];

    isLoading!: boolean;

    get signUpFormGroup(): FormGroup {
        return this.signUpForm;
    }

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly messageService: MessageService,
        private readonly router: Router,
        private readonly sessionService: SessionService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.authService
            .getRangeData()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: (rangeData) => {
                    this.rangeData = rangeData;
                }
            });
    }

    onSignUp() {
        if (this.signUpForm.invalid) {
            this.signUpForm.markAllAsTouched();
            return;
        }
        this.isLoading = true;
        const params = CommonHelper.buildSignupFormData(
            this.getSignUpFormGroupControl('userName').value,
            this.getSignUpFormGroupControl('password').value,
            this.getSignUpFormGroupControl('fullName').value,
            this.getSignUpFormGroupControl('cccd').value,
            this.getSignUpFormGroupControl('phoneNo').value,
            this.getSignUpFormGroupControl('address').value,
            this.getSignUpFormGroupControl('email').value,
            format(endOfDay(new Date(this.getSignUpFormGroupControl('birthday').value)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
            this.getSignUpFormGroupControl('gender').value
        );
        ///default to lowest rank
        const lowestRange = this.rangeData.filter((range) => range.title === RangeEnum.Gold);
        params.append('rangeId', lowestRange[0].id);
        params.append('rangeTitle', lowestRange[0].title);
        params.append('rangeTitle', lowestRange[0].point.toString());

        for (const element of this.selectedFiles) {
            params.append('images', element);
        }

        const loginValue = {
            username: this.getSignUpFormGroupControl('userName').value,
            password: this.getSignUpFormGroupControl('password').value,
            roleName: Roles.CLIENT
        };

        this.authService
            .register(params)
            .pipe(
                takeUntil(this.unsubscribeAll),
                switchMap(() => {
                    return this.authService.login(loginValue);
                })
            )
            .subscribe({
                next: (res) => {
                    this.sessionService.rememberInfo(res);
                    this.messageService.add({ severity: 'success', detail: 'Đăng ký thành công', life: 3000 });
                    setTimeout(() => {
                        this.isLoading = false;
                        this.router.navigate(['', AppRoutes.DashBoard]);
                    }, 3000);
                },
                error: () => {
                    this.isLoading = false;
                }
            });
    }

    onFileSelected(event: any): void {
        for (const element of event.target.files) {
            // @ts-ignore
            this.selectedFiles.push(element);
        }
    }

    removeFile(index: number): void {
        this.selectedFiles.splice(index, 1);
    }

    private initForm(): void {
        this.signUpForm = this.formBuilder.group({
            userName: [null, Validators.required],
            password: [null, Validators.required],
            fullName: [null, Validators.required],
            cccd: [null, Validators.required],
            phoneNo: [null, Validators.required],
            address: [null, Validators.required],
            email: [null, [Validators.email, Validators.required]],
            birthday: [null],
            gender: [null, Validators.required],
            images: [null]
        });
    }

    private getSignUpFormGroupControl(name: string): AbstractControl {
        return this.signUpFormGroup.get(name) as AbstractControl;
    }
}
