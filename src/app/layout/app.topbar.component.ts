import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { SessionService } from "@shared/services";
import { Router } from "@angular/router";
import { AppRoutes } from "@shared/enums";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    menu: MenuItem[] = [];

    @ViewChild('searchinput') searchInput!: ElementRef;

    @ViewChild('menubutton') menuButton!: ElementRef;

    searchActive: boolean = false;

    constructor(
    public layoutService: LayoutService,
    private readonly router: Router,
    private readonly sessionService: SessionService
    ) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    deactivateSearch() {
        this.searchActive = false;
    }

    removeTab(event: MouseEvent, item: MenuItem, index: number) {
        this.layoutService.onTabClose(item, index);
        event.preventDefault();
    }

    get layoutTheme(): string {
        return this.layoutService.config.layoutTheme;
    }

    get colorScheme(): string {
        return this.layoutService.config.colorScheme;
    }


    get tabs(): MenuItem[] {
        return this.layoutService.tabs;
    }

  logout() {
    this.sessionService.destroySession();
    this.router.navigate(['', AppRoutes.Login])
  }
}
