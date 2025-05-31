import { Routes } from '@angular/router';
import { ClientViewComponent } from './components/clients/client-view/client-view-component';
export const routes: Routes = [

  //PagesRoutes
  // {path: 'home', component: HomeComponent},
  // {path: 'about', component: AboutComponent},
  //ClientRoutes
  {path: 'client', component: ClientViewComponent},
  // {path: 'client/detail/:clientId', component: ClientDetailsComponent},
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
