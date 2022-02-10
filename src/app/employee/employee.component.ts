import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})

export class EmployeeComponent implements OnInit {
  disablebtn: boolean = true;

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEmployeeList();
  }

  isValidForm(employeeForm) {
    const id = document.getElementById('btn-sbmt');
    if (!employeeForm.valid) {
        id.style.cursor = 'not-allowed';
        return this.disablebtn;
    } else {
       id.style.cursor = 'pointer';
       return !this.disablebtn;
    }
  }

  onSubmit(employeForm: NgForm) {
    if (employeForm.value._id === "" || employeForm.value._id === null) {
      this.employeeService.postEmployee(employeForm.value).subscribe((res) => {
        this.resetForm(employeForm);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    if (employeForm.value._id !== "" && employeForm.value._id !== null) {
      this.employeeService.putEmployee(employeForm.value).subscribe((res) => {
        this.resetForm(employeForm);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated succesfully', classes: 'rounded' });
      })
    }
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm)
      employeeForm.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: null
    }
  }

  onEdit(emp) {
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, employeeForm: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(employeeForm);
        M.toast({ html: 'Deleted succesfully', classes: 'rounded' });
      })
    }
  }

}