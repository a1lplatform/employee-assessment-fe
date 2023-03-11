import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard', icon: 'pi pi-home',  routerLink: ['/dashboard'],
            },
          {
            label: 'User Management', icon: 'pi pi-fw pi-user',  routerLink: ['/account'],
          },
        ];
    }
}
