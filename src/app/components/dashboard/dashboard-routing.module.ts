import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from "./components/account";
import { EmployeeComponent } from "./components/employee";

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent
  },
  {
    path: '',
    component: AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
