import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { PurchaseComponent } from './purchase/purchase';
import { authGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'purchase', component: PurchaseComponent, canActivate: [authGuard] }
];