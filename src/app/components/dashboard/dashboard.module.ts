import { NgModule } from '@angular/core';
import { EmployeeService } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EmployeeComponent } from './components/employee';
import { AccountComponent } from './components/account';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AccountService } from './services/account.service';
import { DropdownModule } from 'primeng/dropdown';
import { SharedUiModule } from '@shared/modules';

@NgModule({
    declarations: [EmployeeComponent, AccountComponent],
    imports: [
        DashboardRoutingModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        DatePipe,
        FormsModule,
        DropdownModule,
        NgClass,
        NgIf,
        NgForOf,
        SharedUiModule
    ],
    exports: [EmployeeComponent, AccountComponent],
    providers: [EmployeeService, AccountService]
})
export class DashboardModule {}
