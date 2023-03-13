import { NgModule } from '@angular/core';
import { OnlyNumberDirective } from '@shared/directives';

@NgModule({
    declarations: [OnlyNumberDirective],
    exports: [OnlyNumberDirective]
})
export class SharedUiModule {}
