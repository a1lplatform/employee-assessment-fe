import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { ConfirmationService, MessageService } from 'primeng/api';
import { pipe, takeUntil } from 'rxjs';
import { UnSubscribable } from '@shared/directives';
import { GenderConstant } from '@shared/constants';
import { SessionService } from '@shared/services';
import { Employee } from '../../models';
import { CommonHelper } from '@shared/helper';
import { fi } from 'date-fns/locale';

@Component({
    selector: 'app-table',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.scss']
})
export class EmployeeComponent extends UnSubscribable implements OnInit {
    readonly gender = GenderConstant;
    selectedGender = 1;
    employeeData: any;
    employee: any;
    employeeCreate!: any;
    employeeDialog!: boolean;
    employeeViewDialog!: boolean;
    employeeCreationDialog!: boolean;

    submitted!: boolean;
    isLoading!: boolean;
    employeeForm!: FormGroup;
    addEmployeeForm!: FormGroup;

    selectedFiles: any = [];

    get employeeFormGroup(): FormGroup {
        return this.employeeForm;
    }

    constructor(
        private readonly employeeService: EmployeeService,
        private readonly formBuilder: FormBuilder,
        private readonly messageService: MessageService,
        private readonly confirmationService: ConfirmationService
    ) {
        super();
    }

    ngOnInit(): void {
        this.initForm();
        this.isLoading = true;
        this.employeeService
            .getEmployeeData()
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: (data) => {
                    this.employeeData = data;
                    this.isLoading = false;
                },
                error: (err) => {
                    this.isLoading = false;
                }
            });
    }

    addEmployee(): void {
        this.initAddEmployeeForm();
        this.employeeCreate = {};
        this.employeeCreationDialog = true;
        if (this.employeeForm.disabled) {
            this.employeeForm.enable();
        }
    }

    viewEmployee(employee: any) {
        this.employeeViewDialog = true;
        this.employeeForm.disable();
        this.employee = {
            ...employee,
            birthday: new Date(employee.birthday)
        };
        if (employee.assessments.length === 0) {
            let assessmentsObj = {
                content: ''
            };
            employee.assessments.push(assessmentsObj);
        }
    }

    editEmployee(employee: any): void {
        this.employeeDialog = true;
        if (this.employeeForm.disabled) {
            this.employeeForm.enable();
        }
        this.employee = {
            ...employee,
            birthday: new Date(employee.birthday)
        };
        if (employee.assessments.length === 0) {
            let assessmentsObj = {
                content: ''
            };
            employee.assessments.push(assessmentsObj);
        }
    }

    saveAddEmployee(): void {
        this.employeeCreationDialog = false;
    }

    saveEditEmployee(): void {
        this.employeeDialog = false;
        const assessmentObject = {
            id: '00000000-0000-0000-0000-000000000000',
            employeeId: this.employee.id,
            assessmentDate: format(new Date(), 'dd/MM/yyyy'),
            content: this.employeeForm.get('assessment')?.value,
            isActive: true
        };
        const params = CommonHelper.buildFormData(
            this.employee.id,
            this.getControl('address').value,
            format(new Date(this.getControl('birthday').value), 'dd/MM/yyyy'),
            this.getControl('cccd').value,
            this.getControl('email').value,
            this.getControl('fullName').value,
            this.getControl('gender').value,
            this.getControl('phoneNo').value
        );
        for (let i = 0; i < this.selectedFiles.length; i++) {
            params.append('images', this.selectedFiles[i]);
        }
        this.employeeService
            .editEmployee(params)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                },
                error: (err: any) => {
                    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Error' });
                }
            });
    }

    deleteEmployee(employee: any): void {
        this.confirmationService.confirm({
            message: 'Xác nhận xóa nhân viên này',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employeeService
                    .deleteEmployee(employee.id)
                    .pipe(takeUntil(this.unsubscribeAll))
                    .subscribe({
                        next: (res) => {
                            this.employeeData.splice(this.employeeData.indexOf(employee), 1);
                            this.messageService.add({ severity: 'success', detail: 'Xóa thành công', life: 3000 });
                        },
                        error: (err: any) => {
                            this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Error' });
                        }
                    });
            }
        });
    }

    hideDialog(): void {
        this.employeeDialog = false;
        this.employeeCreationDialog = false;
        this.submitted = false;
    }

    private initForm(): void {
        this.employeeForm = this.formBuilder.group({
            fullName: [null, Validators.required],
            phoneNo: [null, Validators.required],
            cccd: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            address: [null, Validators.required],
            gender: [null, Validators.required],
            birthday: [null],
            assessment: [null],
            images: [null]
        });
    }

    onFileSelected(event: any): void {
        for (let i = 0; i < event.target.files.length; i++) {
            // @ts-ignore
            this.selectedFiles.push(event.target.files[i]);
        }
    }

    removeFile(index: any): void {
        this.selectedFiles.splice(index, 1);
    }

    private initAddEmployeeForm(): void {
        this.addEmployeeForm = this.formBuilder.group({
            fullName: [null, Validators.required],
            phoneNo: [null, Validators.required],
            cccd: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            address: [null, Validators.required],
            gender: [null, Validators.required],
            birthday: [null],
            assessment: [null],
            images: [null]
        });
    }

    private getControl(name: string): AbstractControl {
        return this.employeeFormGroup.get(name) as AbstractControl;
    }
}
