import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';


const routes: Routes = [
    { path: '', component: EmployeeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule
    ],
    declarations: [],

})
export class AppRoutingModule { }