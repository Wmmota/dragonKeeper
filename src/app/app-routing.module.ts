import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./area-not-logged/area-not-logged.module').then(
        (m) => m.AreaNotLoggedModule
      ),
  },
  {
    path: 'dragons',
    loadChildren: () =>
      import('./dragons/dragons.module').then((m) => m.DragonsModule),
  },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
