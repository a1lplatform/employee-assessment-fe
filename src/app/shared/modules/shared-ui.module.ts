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

@NgModule({
    declarations: [OnlyNumberDirective, GenderPipe],
    exports: [
        OnlyNumberDirective,
        GenderPipe,
        CalendarModule,
        InputTextModule,
        ButtonModule,
        RippleModule,
        InputNumberModule,
        MessagesModule,
        ToastModule,
        ImageModule
    ],
    providers: [MessageService]
})
export class SharedUiModule {}
