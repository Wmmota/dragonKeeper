import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./area-not-logged/area-not-logged.module').then((m) => m.AreaNotLoggedModule),
  },
  {
    path: 'dragons',
    loadChildren: () => import('./dragons/dragons.module').then((m) => m.DragonsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
