import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDragonsComponent } from './components/list-dragons/list-dragons.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArraySortPipe } from '../shared/pipes/array-sort.pipe';
import { CreateDragonComponent } from './components/create-dragon/create-dragon.component';
import { EditDragonComponent } from './components/edit-dragon/edit-dragon.component';
import { DragonDetailsComponent } from './components/dragon-details/dragon-details.component';
import { DragonDetailsResolver } from './resolvers/dragon-details.resolver';
import { RoutingGuard } from '../area-not-logged/routing-guard/routing-guard.guard';


const routes = [
  {
    path: '',
    component: ListDragonsComponent,
    canActivate: [RoutingGuard],
  },
  {
    path: 'create',
    component: CreateDragonComponent,
    canActivate: [RoutingGuard],
  },
  {
    path: 'detail/:id',
    component: DragonDetailsComponent,
    canActivate: [RoutingGuard],
    resolve: {
      dragon: DragonDetailsResolver
    }
  },
  {
    path: 'edit/:id',
    component: EditDragonComponent,
    canActivate: [RoutingGuard],
    resolve: {
      dragon: DragonDetailsResolver
    }
  },
];


@NgModule({
  declarations: [
    ListDragonsComponent,
    ArraySortPipe,
    CreateDragonComponent,
    EditDragonComponent,
    DragonDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DragonsModule { }
