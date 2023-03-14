import { Component } from '@angular/core';
import { UnSubscribable } from '@shared/directives';
import { EmployeeService } from '../../services';
import { takeUntil } from 'rxjs';
import { Employee } from '../../models';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-client-search',
    templateUrl: './client-search.component.html',
    styleUrls: ['./client-search.component.scss', '../../../../../assets/themes/spinner.scss']
})
export class ClientSearchComponent extends UnSubscribable {
    isLoading!: boolean;
    isLoadingOverlay!: boolean;
    employeeData!: Employee[];

    constructor(private readonly employeeService: EmployeeService, private readonly messageService: MessageService) {
        super();
    }

    searchEmployee(searchString: string) {
        console.log(searchString.length);

        if (!this.employeeData) {
            this.isLoadingOverlay = true;
        }
        //

        let userData = JSON.parse(localStorage.getItem('INFO_REMEMBERED') as string);

        this.isLoading = true;
        this.employeeService
            .searchEmployee(userData.id, searchString)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe({
                next: (res) => {
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isLoadingOverlay = false;
                        if (res.length === 0) {
                            this.messageService.add({
                                severity: 'error',
                                detail: `Không tìm thấy nhân viên với tên ${searchString}`,
                                life: 3000
                            });
                        } else {
                            this.employeeData = res;
                            this.isLoadingOverlay = false;
                            this.messageService.add({
                                severity: 'success',
                                detail: 'Tìm kiếm thành công',
                                life: 3000
                            });
                        }
                    }, 2000);
                },
                error: (err: any) => {
                    setTimeout(() => {
                        this.isLoading = false;
                        this.isLoadingOverlay = false;
                        this.employeeData = [];
                        this.messageService.add({
                            severity: 'error',
                            detail: 'Có lỗi xảy ra khi tìm kiếm',
                            life: 3000
                        });
                    }, 2000);
                }
            });
    }
}
