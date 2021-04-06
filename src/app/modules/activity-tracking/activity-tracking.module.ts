import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'src/app/shared/modal-popup/modal-popup.module';
import { NgxMaskModule } from 'ngx-mask';

import { ActivityTrackingRoutingModule } from './activity-tracking-routing.module';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';


@NgModule({
  declarations: [ActivityComponent, TaskComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ActivityTrackingRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ActivityTrackingModule { }
