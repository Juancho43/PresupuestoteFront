import {Routes} from '@angular/router';
import {ClientViewComponent} from '@components/people/clients/client-view/client-view-component';
import {LoginFormComponent} from '@components/auth/login-form/login-form-component';
import {LogoutFormComponent} from '@components/auth/logout-form/logout-form-component';
import {RegisterFormComponent} from '@components/auth/register-form/register-form-component';
import {AuthorizeFormComponent} from '@components/auth/authorize-form/authorize-form.component';
import {authGuard} from '@core/guards/auth.guard';
import {AboutComponent} from '@components/sections/about-component/about-component';
import {HomeComponent} from '@components/sections/home-component/home-component';
import {ClientDetailComponent} from '@components/people/clients/client-detail/client-detail-component';
import {BudgetViewComponent} from '@components/ownable/budgets/budget-view/budget-view-component';
import {BudgetDetailComponent} from '@components/ownable/budgets/budget-detail/budget-detail-component';
import {MaterialViewComponent} from '@components/items/materials/material-view/material-view-component';
import {MaterialDetailComponent} from '@components/items/materials/material-detail/material-detail-component';
import {
  SupplierDetailComponent
} from '@components/people/suppliers/supplier-detail/supplier-detail-component';
import {SupplierViewComponent} from '@components/people/suppliers/supplier-view/supplier-view-component';
import {InvoiceDetailComponent} from '@components/ownable/invoices/invoice-detail/invoice-detail-component';
import {InvoiceViewComponent} from '@components/ownable/invoices/invoice-view/invoice-view-component';
import {EmployeeViewComponent} from '@components/people/employees/employee-view/employee-view-component';
import {
  EmployeeDetailComponent
} from '@components/people/employees/employee-detail/employee-detail-component';
import {WorkAreaComponent} from '@components/works/work-area/work-area-component';
import {MaterialAreaComponent} from '@components/items/materials/material-area/material-area-component';
import {UserViewComponent} from '@components/user/user-view-component/user-view-component';
import {WorkViewComponent} from '@components/works/work-view/work-view-component';
import {SalaryViewComponent} from '@components/ownable/salaries/salary-view/salary-view-component';
import {PaymentViewComponent} from '@components/payments/payment-view/payment-view-component';
import {PaymentDetailComponent} from '@components/payments/payment-detail/payment-detail-component';
import {SalaryDetailComponent} from '@components/ownable/salaries/salary-detail/salary-detail-component';


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
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {path: 'client', component: ClientViewComponent},
      {path: 'client/detail/:id', component: ClientDetailComponent},
      {path: 'client/edit/:id', component: ClientViewComponent},
      //BudgetRoutes
      {path: 'budget', component: BudgetViewComponent},
      {path: 'budget/new/:clientId', component: BudgetViewComponent},
      {path: 'budget/edit/:id/:clientId', component: BudgetViewComponent},
      {path: 'budget/detail/:id', component: BudgetDetailComponent},
      {path: 'budget/detail/:id/:workId', component: BudgetDetailComponent},
      //WorkRoute
      {path: 'work', component: WorkViewComponent},
      {path: 'work/new/:budgetId', component: WorkAreaComponent},
      {path: 'work/edit/:budgetId/:id', component: WorkAreaComponent},
      //MaterialRoute
      {path: 'material', component: MaterialViewComponent},
      {path: 'material/detail/:id', component: MaterialDetailComponent},
      {path: 'material/new', component: MaterialAreaComponent},
      {path: 'material/edit/:entity/:id', component: MaterialAreaComponent},

      //SupplierRoutes
      {path: 'supplier', component: SupplierViewComponent},
      {path: 'supplier/detail/:id', component: SupplierDetailComponent},
      {path: 'supplier/edit/:id', component: SupplierViewComponent},
      //InvoiceRoute
      {path: 'invoice', component: InvoiceViewComponent},
      {path: 'invoice/detail/:id', component: InvoiceDetailComponent},
      {path: 'invoice/new/:supplierId', component: InvoiceViewComponent},
      {path: 'invoice/edit/:id/:supplierId', component: InvoiceViewComponent},
      //EmployeeRoutes
      {path: 'employee', component: EmployeeViewComponent},
      {path: 'employee/detail/:id', component: EmployeeDetailComponent},
      {path: 'employee/edit/:id', component: EmployeeViewComponent},
      //SalaryRoute
      {path: 'salary', component: SalaryViewComponent},
      {path: 'salary/detail/:id', component: SalaryDetailComponent},
      {path: 'salary/new/:employeeId', component: SalaryViewComponent},
      {path: 'salary/edit/:id/:employeeId', component: SalaryViewComponent},

      //PaymentsRoute
      {path: 'payment', component: PaymentViewComponent},
      {path: 'payment/detail/:id', component: PaymentDetailComponent},
      {path: 'payment/edit/:id', component: PaymentViewComponent},

    ]
  },

  //RedirectionRoutes
  {path: '', redirectTo: 'home' , pathMatch: 'full'},
  {path: '**' , component : HomeComponent},
];
