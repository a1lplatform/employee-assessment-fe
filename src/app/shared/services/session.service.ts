import { Injectable } from '@angular/core';
import { Roles } from '@shared/enums';
import { tr } from 'date-fns/locale';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    constructor() {}

    rememberInfo(data: any): void {
        localStorage.setItem('INFO_REMEMBERED', JSON.stringify(data));
    }

    isAuthenticated(): boolean {
        return !!JSON.parse(localStorage.getItem('INFO_REMEMBERED') as string);
    }

    destroySession(): void {
        localStorage.removeItem('INFO_REMEMBERED');
    }

    isAdmin(): boolean {
        let userInfo = JSON.parse(localStorage.getItem('INFO_REMEMBERED') as string);
        return userInfo.roleName === Roles.ADMIN;
    }
}
