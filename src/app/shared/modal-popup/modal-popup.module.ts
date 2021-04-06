import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalPopupComponent } from './modal-popup/modal-popup.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ModalPopupComponent],
    exports: [ModalPopupComponent]
})
export class ModalModule { }
