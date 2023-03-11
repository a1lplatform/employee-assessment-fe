import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environment/environment";
import { map } from "rxjs/operators";

@Injectable()
export class AccountService {

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "multipart/form-data; application/problem+json; charset=utf-8" // 👈
    })
  };
  constructor(
    private readonly httpClient: HttpClient
  ) {
  }
  getAccounts(): Observable<any> {
    return this.httpClient.get(`${environment.defaultApiBasePath}/Accounts`).pipe(map((res: any) => res && res.data))
  }

  editAccount(accountData: any): Observable<any> {
    return this.httpClient.put(`${environment.defaultApiBasePath}/Accounts`, accountData , this.httpOptions).pipe(map((res: any) => res && res.data))
  }

  createAccount(accountData: any): Observable<any> {
    return this.httpClient.post(`${environment.defaultApiBasePath}/Accounts`, accountData).pipe(map((res: any) => res && res.data))
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.httpClient.delete(`${environment.defaultApiBasePath}/Accounts/${accountId}`).pipe(map((res: any) => res && res.data))
  }
}
