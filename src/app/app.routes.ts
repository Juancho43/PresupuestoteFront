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
import {BudgetViewComponent} from './components/budgets/budget-view-component/budget-view-component';
import { BudgetDetailComponent } from './components/budgets/budget-detail-component/budget-detail-component';
import {MaterialViewComponent} from './components/materials/material-view-component/material-view-component';
import {MaterialDetailComponent} from './components/materials/material-detail-component/material-detail-component';
import {SupplierDetailComponent} from './components/suppliers/supplier-detail-component/supplier-detail-component';
import {SupplierViewComponent} from './components/suppliers/supplier-view-component/supplier-view-component';
import {InvoiceDetailComponent} from './components/invoices/invoice-detail-component/invoice-detail-component';
import {InvoiceViewComponent} from './components/invoices/invoice-view-component/invoice-view-component';
import {EmployeeViewComponent} from './components/employees/employee-view-component/employee-view-component';
import {EmployeeDetailComponent} from './components/employees/employee-detail-component/employee-detail-component';
import {EmployeeFormComponent} from './components/employees/employee-form-component/employee-form-component';

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
  {path: 'client/detail/:id', component: ClientDetailComponent},
  {path: 'client/edit/:id', component: ClientViewComponent},
  // //BudgetRoutes
  {path: 'budget', component: BudgetViewComponent},
  {path: 'budget/detail/:budgetId', component: BudgetDetailComponent},
  {path: 'budget/new/:clientId', component: BudgetViewComponent},
  {path: 'budget/edit/:budgetId', component: BudgetViewComponent},
  // //WorkRoute
  // {path: 'work', component: WorkViewComponent},
  // //MaterialRoute
  {path: 'material', component: MaterialViewComponent},
  {path: 'material/detail/:id', component: MaterialDetailComponent},
  // //SupplierRoutes
  {path: 'supplier', component: SupplierViewComponent},
  {path: 'supplier/detail/:id', component: SupplierDetailComponent},
  {path: 'supplier/edit/:id', component: SupplierViewComponent},
  // //InvoiceRoute
  {path: 'invoice', component: InvoiceViewComponent},
  {path: 'invoice/detail/:id', component: InvoiceDetailComponent},
  // //FixedCostRoute
  // {path: 'cost', component: CostViewComponent},
  // {path: 'cost/edit/:costId', component: CostViewComponent},
  // //EmployeeRoutes
  {path: 'employee', component: EmployeeViewComponent},
  {path: 'employee/detail/:id', component: EmployeeDetailComponent},
  {path: 'employee/edit/:id', component: EmployeeFormComponent},
  //RedirectionRoutes
  {path: '', redirectTo: 'home' , pathMatch: 'full'},
  {path: '**' , component : HomeComponent},
];
