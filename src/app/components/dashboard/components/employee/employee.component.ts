import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services";
import { FormBuilder, FormGroup } from "@angular/forms";
import { format } from 'date-fns'
import { ConfirmationService, MessageService } from "primeng/api";
import { takeUntil } from "rxjs";
import { UnSubscribable } from "@shared/directives";


@Component({
  selector: 'app-table',
  templateUrl: 'employee.component.html',
  styleUrls: ['employee.component.scss']
})
export class EmployeeComponent extends UnSubscribable implements OnInit {

  employeeData: any;
  employee: any;
  employeeDialog!: boolean;
  employeeCreationDialog!: boolean;

  submitted!: boolean;
  employeeForm!: FormGroup;

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
    this.employeeService.getEmployeeData().subscribe({
      next: (data) => {
        this.employeeData = data;
      }
    })
  }

  addEmployee(): void {
    this.employee = {};
    this.employeeCreationDialog = true
  }

  editEmployee(employee: any): void {
    this.employeeDialog = true;
    this.employee = {...employee};
  }

  saveAddEmployee(): void {
    this.employeeCreationDialog = false;
    console.log(this.employeeForm)
  }

  saveEditEmployee(): void {
    this.employeeDialog = false;
    let formData = new FormData();
    formData.append('FullName', this.employeeForm.get('fullName')?.value)
    formData.append('PhoneNo',  this.employeeForm.get('phoneNo')?.value)
    formData.append('Email',  this.employeeForm.get('email')?.value)
    formData.append('Address',  this.employeeForm.get('address')?.value)
    formData.append('CCCD',  this.employeeForm.get('cccd')?.value)
    formData.append('Birthday', format(new Date(this.employee.birthday), 'dd-MM-yyyy'))
    formData.append('ID',  this.employee.id)
    this.employeeService.editEmployee(formData)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe({
        next: (res: any) => {
          console.log(res)
        },
        error: (err: any) => {
          console.log(err)
          this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Error'});
        }
      })

  }

  deleteEmployee(employee: any): void {
    this.confirmationService.confirm({
      message: 'Xác nhận xóa nhân viên này',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.employeeService.deleteEmployee(employee.id)
            .pipe(takeUntil(this.unsubscribeAll))
          .subscribe({
              next: (res) => {
                this.employeeData.splice(this.employeeData.indexOf(employee), 1)
                this.messageService.add({severity:'success', detail: 'Xóa thành công', life: 3000});
              },
              error: (err: any) => {
                this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Error'});
              }
          })
      }
    })
  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      fullName: [null],
      phoneNo: [null],
      cccd: [null],
      email: [null],
      address: [null],
      gender: [null],
      birthday: [null],
      assessment: [null]
    })
  }

  hideDialog(): void {
    this.employeeDialog = false;
    this.submitted = false;
  }


}