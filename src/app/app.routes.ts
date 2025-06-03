import { Routes } from '@angular/router';
import { ClientViewComponent } from './components/clients/client-view/client-view-component';
import {LoginFormComponent} from './components/auth/login-form-component/login-form-component';
import {LogoutFormComponent} from './components/auth/logout-form-component/logout-form-component';
import {RegisterFormComponent} from './components/auth/register-form-component/register-form-component';
import {AuthorizeFormComponent} from './components/auth/authorize-form-component/authorize-form.component';
import {authGuard} from './core/guards/auth.guard';
import {AboutComponent} from './components/sections/about-component/about-component';
import {HomeComponent} from './components/sections/home-component/home-component';
import {ClientDetailComponent} from './components/clients/client-detail-component/client-detail-component';

export const routes: Routes = [

  //PagesRoutes
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  //AuthRoutes

  { path : 'login', component: LoginFormComponent},
  { path : 'logout', component: LogoutFormComponent, canActivate: [authGuard]},
  { path : 'register', component: RegisterFormComponent},
  { path : 'authorize', component: AuthorizeFormComponent, canActivate: [authGuard] },

  //ClientRoutes
  {path: 'client', component: ClientViewComponent, canActivate: [authGuard],},
  {path: 'client/detail/:clientId', component: ClientDetailComponent},
  // {path: 'client/edit/:clientId', component: ClientViewComponent},
  // //BudgetRoutes
  // {path: 'budget', component: BudgetViewComponent},
  // {path: 'budget/detail/:budgetId', component: BudgetDetailsComponent},
  // {path: 'budget/new/:clientId', component: BudgetViewComponent},
  // {path: 'budget/edit/:budgetId', component: BudgetViewComponent},
  // //WorkRoute
  // {path: 'work', component: WorkViewComponent},
  // //MaterialRoute
  // {path: 'material', component: MaterialViewComponent},
  // {path: 'material/add', component: MaterialFormViewComponent},
  // //SupplierRoutes
  // {path: 'supplier', component: SupplierViewComponent},
  // {path: 'supplier/detail/:supplierId', component: SupplierDetailsComponent},
  // {path: 'supplier/edit/:supplierId', component: SupplierViewComponent},
  // //InvoiceRoute
  // {path: 'invoice/detail/:invoicedId', component: InvoiceDetailComponent},
  // //FixedCostRoute
  // {path: 'cost', component: CostViewComponent},
  // {path: 'cost/edit/:costId', component: CostViewComponent},
  // //EmployeeRoutes
  // {path: 'employee', component: EmployeeViewComponent},
  // {path: 'employee/detail/:employeeId', component: EmployeeDetailsComponent},
  // {path: 'employee/edit/:employeeId', component: EmployeeFormComponent},
  //RedirectionRoutes
  {path: '', redirectTo: 'home' , pathMatch: 'full'},
  // {path: '**' , component : HomeComponent},
];
