import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from '@shared/services';
import { Observable } from 'rxjs';
import { AppRoutes } from '@shared/enums';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private readonly router: Router, private readonly sessionService: SessionService) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.sessionService.isAdmin()) {
            return true;
        }
        this.router.navigate(['', AppRoutes.Search]);
        return false;
    }
}
