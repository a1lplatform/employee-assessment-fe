import { NgModule } from '@angular/core';
import { EmployeeService } from "./services";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { DatePipe } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { RippleModule } from "primeng/ripple";
import { MessagesModule } from "primeng/messages";
import { CalendarModule } from "primeng/calendar";
import { EmployeeComponent } from "./components/employee";
import { AccountComponent } from "./components/account";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { AccountService } from "./services/account.service";


@NgModule({
  declarations: [EmployeeComponent, AccountComponent],
  imports: [
    DashboardRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DatePipe,
    CalendarModule,
    FormsModule,
    MessagesModule,
    ToastModule
  ],
  exports: [
    EmployeeComponent, AccountComponent
  ],
  providers: [EmployeeService, MessageService, AccountService]
})
export class DashboardModule { }
