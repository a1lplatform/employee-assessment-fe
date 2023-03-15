import { NgModule } from '@angular/core';
import { OnlyNumberDirective } from '@shared/directives';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { GenderPipe } from '@shared/pipes';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
    declarations: [OnlyNumberDirective, GenderPipe],
    exports: [
        ///pipes and directives
        OnlyNumberDirective,
        GenderPipe,

        //primeng module
        ButtonModule,
        CalendarModule,
        DropdownModule,
        ImageModule,
        InputNumberModule,
        InputTextModule,
        MessagesModule,
        PasswordModule,
        ProgressSpinnerModule,
        RippleModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class SharedUiModule {}
