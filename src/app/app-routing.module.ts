import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/security/security.module').then(m => m.SecurityModule)
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'Catalog',
        loadChildren: () => import('./modules/catalog/catalog.module').then(m => m.CatalogModule)
      }, {
        path: 'Project/:id',
        loadChildren: () =>
          import('./modules/activity-tracking/activity-tracking.module').then(m => m.ActivityTrackingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
