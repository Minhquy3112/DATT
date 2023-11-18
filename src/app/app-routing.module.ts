import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SellerAuthComponent } from './pages/seller-auth/seller-auth.component';

import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutAdminComponent } from './admin/layout-admin/layout-admin.component';
import { WatchComponent } from './pages/watch/watch.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';

import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DetailComponent } from './pages/detail/detail.component';
import { AddProductsComponent } from './admin/pages-admin/add-products/add-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { ListProductsComponent } from './admin/pages-admin/list-products/list-products.component';
import { EditProductsComponent } from './admin/pages-admin/edit-products/edit-products.component';
import { ListUserComponent } from './admin/pages-admin/list-user/list-user.component';
import { InfoAdminComponent } from './admin/pages-admin/info-admin/info-admin.component';
import { DashboardComponent } from './admin/pages-admin/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ListCartComponent } from './admin/pages-admin/list-cart/list-cart.component';




const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path: "signup",
        component: SignupComponent
      },
      {
        path: "signin",
        component: SigninComponent
      },
      {
        path: "watch",
        component: WatchComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },


    ]
  },

  {
    path: "admin",
    component: LayoutAdminComponent,
    canActivate:[AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "products",
        component: ListProductsComponent
      },
      {
        path: "user",
        component: ListUserComponent,
      },
      {
        path: "info",
        component: InfoAdminComponent,
      },
      {
        path: "listCart",
        component: ListCartComponent,
      },
      {
        path: "add",
        component: AddProductsComponent
      },
      {
        path: "edit/:id",
        component: EditProductsComponent
      }
    ]
  },
  {
    path: '**',
    component: NotfoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
