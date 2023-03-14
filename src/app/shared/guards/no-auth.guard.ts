import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '@shared/services';
import { AppRoutes } from '@shared/enums';

@Injectable({
    providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(private readonly router: Router, private readonly sessionService: SessionService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.sessionService.isAuthenticated()) {
            this.router.navigate([AppRoutes.DashBoard]);
            return false;
        }
        return true;
    }
}
