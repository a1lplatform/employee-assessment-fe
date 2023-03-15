import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { EmployeeComponent } from './components/dashboard/components/employee';
import { AccountComponent } from './components/dashboard/components/account';
import { AuthGuard, NoAuthGuard } from '@shared/guards';
import { AppRoutes } from '@shared/enums';
import { SignUpComponent } from './components/auth/components/sign-up';
import { ClientSearchComponent } from './components/dashboard/components/client-search';

const routes: Routes = [
    { path: '', redirectTo: AppRoutes.DashBoard, pathMatch: 'full' },
    {
        path: '',
        component: AppLayoutComponent,
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
            {
                path: AppRoutes.Search,
                data: { breadcrumb: 'Tìm kiếm thông tin nhân viên' },
                component: ClientSearchComponent,
                canActivate: [AuthGuard]
            }
        ]
    },
    {
        path: AppRoutes.SignUp,
        component: SignUpComponent,
        canActivate: [NoAuthGuard]
    },
    {
        path: AppRoutes.Login,
        loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
