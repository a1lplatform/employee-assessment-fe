import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { EmployeeComponent } from "./components/dashboard/components/employee";
import { AccountComponent } from "./components/dashboard/components/account";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: 'dashboard',
        data: { breadcrumb: 'Thông tin nhân viên' },
        component: EmployeeComponent
      },
      {
        path: 'account',
        data: { breadcrumb: 'Tài khoản' },
        component: AccountComponent
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
