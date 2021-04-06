import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CatalogRoutingModule } from './catalog-routing.module';
import { ProjectComponent } from './project/project.component';
import { CoworkerComponent } from './coworker/coworker.component';


import { ModalModule } from 'src/app/shared/modal-popup/modal-popup.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ProjectComponent, CoworkerComponent, UserComponent],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    AngularMaterialModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CatalogModule { }
