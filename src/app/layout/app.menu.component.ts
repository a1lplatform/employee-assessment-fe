import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { SessionService } from '@shared/services';
import { AppRoutes } from '@shared/enums';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    isAdmin!: boolean;

    constructor(private readonly sessionService: SessionService) {}

    ngOnInit() {
        this.isAdmin = this.sessionService.isAdmin();
        this.model = [
            {
                label: 'Thông tin nhân viên',
                icon: 'pi pi-home',
                routerLink: this.sessionService.isAdmin() ? [AppRoutes.DashBoard] : ''
            },
            {
                label: 'Quản lý tài khoản',
                icon: 'pi pi-fw pi-user',
                routerLink: this.sessionService.isAdmin() ? [AppRoutes.Account] : ''
            }
        ];
    }
}
