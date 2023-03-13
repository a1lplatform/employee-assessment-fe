import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';
import { map } from 'rxjs/operators';
import { Employee } from '../models';

@Injectable()
export class EmployeeService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data; application/problem+json; charset=utf-8' // 👈
        })
    };
    constructor(private readonly httpClient: HttpClient) {}
    getEmployeeData(): Observable<Employee[]> {
        return this.httpClient
            .get(`${environment.defaultApiBasePath}/Employee`)
            .pipe(map((res: any) => res && res.data));
    }

    editEmployee(employeeData: any): Observable<any> {
        return this.httpClient
            .put(`${environment.defaultApiBasePath}/Employee`, employeeData)
            .pipe(map((res: any) => res && res.data));
    }

    createEmployee(employeeData: any): Observable<any> {
        return this.httpClient
            .post(`${environment.defaultApiBasePath}/Employee`, employeeData)
            .pipe(map((res: any) => res && res.data));
    }

    deleteEmployee(employeeId: string): Observable<any> {
        return this.httpClient
            .delete(`${environment.defaultApiBasePath}/Employee/${employeeId}`)
            .pipe(map((res: any) => res && res.data));
    }
}
