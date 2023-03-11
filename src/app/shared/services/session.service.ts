import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  rememberInfo(data: any): void {
    localStorage.setItem('INFO_REMEMBERED', JSON.stringify(data))
  }

   isAuthenticated(): boolean {
    return !!JSON.parse(localStorage.getItem('INFO_REMEMBERED') as string);
  }

  destroySession(): void {
    localStorage.removeItem('INFO_REMEMBERED')
  }
}
