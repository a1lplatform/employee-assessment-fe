import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, Login, Range } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private readonly httpClient: HttpClient) {}

    login(loginValue: Login): Observable<Account> {
        return this.httpClient
            .post(`${environment.defaultApiBasePath}/Accounts/login`, loginValue)
            .pipe(map((res: any) => res && res.data));
    }

    register(params: any): Observable<any> {
        return this.httpClient
            .post(`${environment.defaultApiBasePath}/Accounts/register`, params)
            .pipe(map((res: any) => res && res.data));
    }

    getRangeData(): Observable<Range[]> {
        return this.httpClient.get(`${environment.defaultApiBasePath}/Range`).pipe(map((res: any) => res && res.data));
    }
}
