import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ConfirmationService } from 'primeng/api';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, AppLayoutModule],
    providers: [ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
