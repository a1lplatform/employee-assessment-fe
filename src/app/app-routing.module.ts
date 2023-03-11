import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { EmployeeComponent } from "./components/dashboard/components/employee";
import { AccountComponent } from "./components/dashboard/components/account";
import { AuthGuard } from "@shared/guards";
import { AppRoutes } from "@shared/enums";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: AppRoutes.DashBoard,
        data: { breadcrumb: 'Thông tin nhân viên' },
        component: EmployeeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: AppRoutes.Account,
        data: { breadcrumb: 'Tài khoản' },
        component: AccountComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: AppRoutes.Login,
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
