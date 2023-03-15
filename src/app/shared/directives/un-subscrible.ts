import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class UnSubscribable implements OnDestroy {

    protected readonly unsubscribeAll: Subject<any>;

    protected constructor() {
        this.unsubscribeAll = new Subject<any>();
    }

    ngOnDestroy(): void {
        this.unsubscribeAll.next(undefined);
        this.unsubscribeAll.complete();
    }
}
