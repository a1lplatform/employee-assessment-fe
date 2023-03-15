import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login';
import { SignUpComponent } from './components/sign-up';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: '',
        component: SignUpComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
