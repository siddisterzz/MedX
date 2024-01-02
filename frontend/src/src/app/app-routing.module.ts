import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { NewUserComponent } from './auth/new-user/new-user.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{ path: 'branded', loadChildren: () => import('./branded/branded.module').then(m => m.BrandedModule),canActivate: [AuthGuard] },
                        { path: 'generic', loadChildren: () => import('./generic/generic.module').then(m => m.GenericModule), canActivate: [AuthGuard]},
                        { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canActivate: [AuthGuard]},
                        { path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule), canActivate: [AuthGuard]},
                        { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
                        { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },

                        { path: 'login', component:LoginComponent },
                        { path: 'new-user', component:NewUserComponent },
                        { path: 'logout', component:LogoutComponent,canActivate: [AuthGuard]},

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
