import {Routes} from '@angular/router';
import {ClientViewComponent} from '@components/people/clients/client-view/client-view-component';
import {LoginFormComponent} from '@components/auth/login-form-component/login-form-component';
import {LogoutFormComponent} from '@components/auth/logout-form-component/logout-form-component';
import {RegisterFormComponent} from '@components/auth/register-form-component/register-form-component';
import {AuthorizeFormComponent} from '@components/auth/authorize-form-component/authorize-form.component';
import {authGuard} from '@core/guards/auth.guard';
import {AboutComponent} from '@components/sections/about-component/about-component';
import {HomeComponent} from '@components/sections/home-component/home-component';
import {ClientDetailComponent} from '@components/people/clients/client-detail-component/client-detail-component';
import {BudgetViewComponent} from '@components/ownable/budgets/budget-view-component/budget-view-component';
import {BudgetDetailComponent} from '@components/ownable/budgets/budget-detail-component/budget-detail-component';
import {MaterialViewComponent} from '@components/items/materials/material-view-component/material-view-component';
import {MaterialDetailComponent} from '@components/items/materials/material-detail-component/material-detail-component';
import {
  SupplierDetailComponent
} from '@components/people/suppliers/supplier-detail-component/supplier-detail-component';
import {SupplierViewComponent} from '@components/people/suppliers/supplier-view-component/supplier-view-component';
import {InvoiceDetailComponent} from '@components/ownable/invoices/invoice-detail-component/invoice-detail-component';
import {InvoiceViewComponent} from '@components/ownable/invoices/invoice-view-component/invoice-view-component';
import {EmployeeViewComponent} from '@components/people/employees/employee-view-component/employee-view-component';
import {
  EmployeeDetailComponent
} from '@components/people/employees/employee-detail-component/employee-detail-component';
import {EmployeeFormComponent} from '@components/people/employees/employee-form-component/employee-form-component';
import {WorkAreaComponent} from '@components/works/work-area/work-area-component';
import {MaterialAreaComponent} from '@components/items/materials/material-area-component/material-area-component';
import {UserViewComponent} from '@components/user/user-view-component/user-view-component';


export const routes: Routes = [

  //PagesRoutes
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  //AuthRoutes

  { path : 'login', component: LoginFormComponent},
  { path : 'logout', component: LogoutFormComponent, canActivate: [authGuard]},
  { path : 'register', component: RegisterFormComponent},
  { path : 'authorize', component: AuthorizeFormComponent, canActivate: [authGuard] },
  { path : 'user', component: UserViewComponent, canActivate: [authGuard] },

  //ClientRoutes

  {path: 'client', component: ClientViewComponent, canActivate: [authGuard],},
  {path: 'client/detail/:id', component: ClientDetailComponent},
  {path: 'client/edit/:id', component: ClientViewComponent},
  // //BudgetRoutes
  {path: 'budget', component: BudgetViewComponent},
  {path: 'budget/new/:clientId', component: BudgetViewComponent},
  {path: 'budget/edit/:id/:clientId', component: BudgetViewComponent},
  {path: 'budget/detail/:id', component: BudgetDetailComponent},
  {path: 'budget/detail/:id/:workId', component: BudgetDetailComponent},
  // //WorkRoute
  {path: 'work/new/:budgetId', component: WorkAreaComponent},
  {path: 'work/edit/:budgetId/:id', component: WorkAreaComponent},
  // //MaterialRoute
  {path: 'material', component: MaterialViewComponent},
  {path: 'material/detail/:id', component: MaterialDetailComponent},
  {path: 'material/new', component: MaterialAreaComponent},
  {path: 'material/edit/:entity/:id', component: MaterialAreaComponent},

  // //SupplierRoutes
  {path: 'supplier', component: SupplierViewComponent},
  {path: 'supplier/detail/:id', component: SupplierDetailComponent},
  {path: 'supplier/edit/:id', component: SupplierViewComponent},
  // //InvoiceRoute
  {path: 'invoice', component: InvoiceViewComponent},
  {path: 'invoice/detail/:id', component: InvoiceDetailComponent},
  {path: 'invoice/new/:supplierId', component: InvoiceDetailComponent},
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
