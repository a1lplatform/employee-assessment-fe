import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environment/environment";
import { map } from "rxjs/operators";
import { Employee } from "../models";

@Injectable()
export class EmployeeService {
  constructor(
    private readonly httpClient: HttpClient
  ) {
  }
  getEmployeeData(): Observable<Employee> {
    return this.httpClient.get(`${environment.defaultApiBasePath}/Employee`).pipe(map((res: any) => res && res.data))
  }
}
