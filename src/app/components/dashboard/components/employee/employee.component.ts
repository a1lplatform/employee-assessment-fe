import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services';
import { AbstractControl, Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { endOfDay, format } from 'date-fns';
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
    employeeData!: Employee[];
    employee!: Employee;
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

    get addEmployeeFormGroup(): FormGroup {
        return this.addEmployeeForm;
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
                    for (let employee of this.employeeData) {
                        if (employee.assessments.length === 0) {
                            let assessmentsObj = {
                                content: ''
                            };
                            // @ts-ignore
                            employee.assessments.push(assessmentsObj);
                        }
                    }
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

    viewEmployee(employee: Employee): void {
        this.employeeViewDialog = true;
        this.employeeForm.disable();
        this.employee = {
            ...employee,
            birthday: new Date(employee.birthday)
        };
    }

    editEmployee(employee: Employee): void {
        this.employeeDialog = true;
        if (this.employeeForm.disabled) {
            this.employeeForm.enable();
        }
        this.employee = {
            ...employee,
            birthday: new Date(employee.birthday)
        };
    }

    onFinishEditAssessment(employee: Employee): void {
        const params = {
            id: employee.id,
            employeeId: employee.id,
            content: employee.assessments[0].content,
            assessmentDate: format(endOfDay(new Date()), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
            isActive: true
        };
        this.employeeService
            .editEmployeeAssessment([params])
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', detail: 'Chỉnh sửa thành công', life: 3000 });
                }
            });
    }

    saveAddEmployee(): void {
        this.employeeCreationDialog = false;
        const params = CommonHelper.buildFormData(
            this.getCreateEmployeeFormGroupControl('address').value,
            format(new Date(this.getCreateEmployeeFormGroupControl('birthday').value), 'dd/MM/yyyy'),
            this.getCreateEmployeeFormGroupControl('cccd').value,
            this.getCreateEmployeeFormGroupControl('email').value,
            this.getCreateEmployeeFormGroupControl('fullName').value,
            this.getCreateEmployeeFormGroupControl('gender').value,
            this.getCreateEmployeeFormGroupControl('phoneNo').value
        );
        for (let i = 0; i < this.selectedFiles.length; i++) {
            params.append('images', this.selectedFiles[i]);
        }
        params.delete('ID');
        this.employeeService
            .createEmployee(params)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: () => {
                    this.messageService.add({ severity: 'success', detail: 'Tạo thành công', life: 3000 });
                },
                error: (err: any) => {
                    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Error' });
                }
            });
    }

    saveEditEmployee(): void {
        this.employeeDialog = false;
        const params = CommonHelper.buildFormData(
            this.getEmployeeFormGroupControl('address').value,
            format(new Date(this.getEmployeeFormGroupControl('birthday').value), 'dd/MM/yyyy'),
            this.getEmployeeFormGroupControl('cccd').value,
            this.getEmployeeFormGroupControl('email').value,
            this.getEmployeeFormGroupControl('fullName').value,
            this.getEmployeeFormGroupControl('gender').value,
            this.getEmployeeFormGroupControl('phoneNo').value,
            this.employee.id
        );
        for (let i = 0; i < this.selectedFiles.length; i++) {
            params.append('images', this.selectedFiles[i]);
        }
        this.employeeService
            .editEmployee(params)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: (res: any) => {
                    this.messageService.add({ severity: 'success', detail: 'Chỉnh sửa thành công', life: 3000 });
                },
                error: (err: any) => {
                    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Error' });
                }
            });
    }

    deleteEmployee(employee: Employee): void {
        this.confirmationService.confirm({
            message: 'Xác nhận xóa nhân viên này',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.employeeService
                    .deleteEmployee(employee.id)
                    .pipe(takeUntil(this.unsubscribeAll))
                    .subscribe({
                        next: () => {
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
        this.employeeViewDialog = false;
        this.submitted = false;
    }

    onFileSelected(event: any): void {
        for (let i = 0; i < event.target.files.length; i++) {
            // @ts-ignore
            this.selectedFiles.push(event.target.files[i]);
        }
    }

    removeFile(index: number): void {
        this.selectedFiles.splice(index, 1);
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

    private getEmployeeFormGroupControl(name: string): AbstractControl {
        return this.employeeFormGroup.get(name) as AbstractControl;
    }

    private getCreateEmployeeFormGroupControl(name: string): AbstractControl {
        return this.addEmployeeFormGroup.get(name) as AbstractControl;
    }
}
