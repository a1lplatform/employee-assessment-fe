import { NgModule } from '@angular/core';
import { TableComponent } from "./components/table/table.component";
import { EmployeeService } from "./services";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { CalendarModule } from "primeng/calendar";
import { MessageService } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { ToastModule } from "primeng/toast";


@NgModule({
  declarations: [TableComponent],
  imports: [
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
    TableComponent
  ],
  providers: [EmployeeService, MessageService]
})
export class AuthModule { }
