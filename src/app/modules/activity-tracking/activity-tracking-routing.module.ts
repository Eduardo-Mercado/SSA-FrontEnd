import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ActivityComponent } from './activity/activity.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [{
  path: '',
  component: ActivityComponent,
   canActivate: [AuthGuard]
}, {
  path: 'Task/:id',
  component: TaskComponent
},
{
  path: 'AutorizeTask/:id',
  component: TaskComponent
},
{
  path: 'SeeTask/:id',
  component: TaskComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityTrackingRoutingModule { }
