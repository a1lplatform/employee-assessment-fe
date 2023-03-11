import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { format } from 'date-fns'
import { ConfirmationService, MessageService } from "primeng/api";
import { takeUntil } from "rxjs";
import { UnSubscribable } from "@shared/directives";
import { AccountService } from "../../services/account.service";


@Component({
  selector: 'app-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.scss']
})
export class AccountComponent extends UnSubscribable implements OnInit {

  accountData: any;
  account: any;
  accountDialog!: boolean;
  employeeCreationDialog!: boolean;

  submitted!: boolean;
  accountForm!: FormGroup;

  constructor(
    private readonly accountService: AccountService,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.accountService.getAccounts().subscribe({
      next: (data) => {
        this.accountData = data;
      }
    })
  }

  addEmployee(): void {
    this.account = {};
    this.employeeCreationDialog = true
  }

  editEmployee(employee: any): void {
    this.accountDialog = true;
    this.account = {...employee};
  }

  saveAddEmployee(): void {
    this.employeeCreationDialog = false;
    console.log(this.accountForm)
  }

  saveEditEmployee(): void {
    this.accountDialog = false;
    let formData = new FormData();
    formData.append('FullName', this.accountForm.get('fullName')?.value)
    formData.append('PhoneNo',  this.accountForm.get('phoneNo')?.value)
    formData.append('Email',  this.accountForm.get('email')?.value)
    formData.append('Address',  this.accountForm.get('address')?.value)
    formData.append('CCCD',  this.accountForm.get('cccd')?.value)
    formData.append('Birthday', format(new Date(this.account.birthday), 'dd-MM-yyyy'))
    formData.append('ID',  this.account.id)
    this.accountService.editEmployee(formData)
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
        this.accountService.deleteEmployee(employee.id)
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe({
            next: (res) => {
              this.accountData.splice(this.accountData.indexOf(employee), 1)
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
    this.accountForm = this.formBuilder.group({
      username: [null],
      point: [null],
      roleName: [null],
      fullName: [null],
      phoneNo: [null],
      email: [null],
      birthday: [null],
    })
  }

  hideDialog(): void {
    this.accountDialog = false;
    this.submitted = false;
  }


}
