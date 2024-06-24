import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin/orders', component: AdminOrdersComponent },
  { path: 'admin/users', component: AdminUsersComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }
  
];

export default routes;