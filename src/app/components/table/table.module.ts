import { NgModule } from '@angular/core';
import { TableComponent } from "./components/table/table.component";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { EmployeeService } from "./services";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [TableComponent],
  imports: [
    MatTableModule,
    MatIconModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent
  ],
  providers: [EmployeeService]
})
export class AuthModule { }
