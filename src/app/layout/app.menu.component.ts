import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Thông tin nhân viên', icon: 'pi pi-home', routerLink: ['/dashboard'],
      },
      {
        label: 'Quản lý tài khoản', icon: 'pi pi-fw pi-user', routerLink: ['/account'],
      },
    ];
  }
}
