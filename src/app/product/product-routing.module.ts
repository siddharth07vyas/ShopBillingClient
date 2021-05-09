import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { ProductComponent } from './product.component';

const routes: Routes = [
  { path: '', 
  component: ProductComponent ,
},
    {
      path: 'product-detail',
      component:ProductDetailComponent
    },
    {
      path: 'product-detail/:id',
      component:ProductDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
