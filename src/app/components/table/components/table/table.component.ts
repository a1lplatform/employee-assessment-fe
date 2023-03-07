import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../../services";
import { Employee } from "../../models";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

  employeeData: any;
  employee: any;
  employeeDialog!: boolean;

  submitted!: boolean;
  employeeForm!: FormGroup;
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.employeeService.getEmployeeData().subscribe({
      next: (data) => {
        this.employeeData = data;
      }
    })
  }


  editEmployee(employee: any) {
    this.employeeDialog = true;
    this.employee = {...employee};
    console.log(this.employee)
  }

  deleteEmployee(employee: any) {

  }

  initForm(): void {
    this.employeeForm = this.formBuilder.group({
      fullName: [null],
      phoneNo: [null],
      email: [null],
      address: [null],
      gender: [null],
      assessment: [null]
    })
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.employeeDialog = false;
  }
}
