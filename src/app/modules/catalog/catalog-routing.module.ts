import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { CoworkerComponent } from './coworker/coworker.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent
},
{
  path: 'Coworker',
  component: CoworkerComponent
},
{
  path: 'User',
  component: UserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
