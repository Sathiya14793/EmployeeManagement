import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { IEmployee, EmployeeserviceService } from '../services/employeeservice.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {

  public columnDefs;
  public rowData: IEmployee[];
  public gridApi;
  public gridColumnApi;
  searchtext: any;

  constructor(private dialog: MatDialog, private empService: EmployeeserviceService) {
    this.columnDefs = [
      { field: 'SNo', valueFormatter: (params) => (params.node.childIndex + 1), sortable: true, width: 60, resizable: true },
      { field: 'Id', sortable: true, width: 60, resizable: true },
      { field: 'Name', sortable: true, resizable: true, cellStyle: { color: 'blue', 'cursor': 'pointer' } },
      { field: 'Age', sortable: true, resizable: true },
      { field: 'Address', sortable: true, width: 380, resizable: true },
      { field: 'Contact', sortable: true, resizable: true },
      {
        field: 'Delete', valueFormatter: (params) => "Delete", sortable: true, resizable: true, cellStyle: { color: 'Red', 'cursor': 'pointer' }
      }
    ];
  }

  ngOnInit() {

  }
  getEmployeeList() {
    this.empService.getEmployees().subscribe(
      employees => {
        this.rowData = employees;
      }
    )
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.paginationSetPageSize(Number(5));
    this.gridColumnApi = params.columnApi;
    this.getEmployeeList();
  }
  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(this.searchtext);
  }
  CellClicked(params) {
    if (params.colDef.field == "Delete") {
      this.DeleteEmployee(params);
    }
    if (params.colDef.field == "Name") {
      this.AddEmployee(params)
    }
  }
  AddEmployee(params: any = {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      Status: params.data == undefined ? "Add" : "Update",
      data: params.data == undefined ? "" : params.data
    };
    this.dialog.open(EmployeeDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if (data) {
        const _isNew = data.Id == 0;
        const _employee: IEmployee = {
          Id: (_isNew ? 0 : data.Id),
          Name: data.Name,
          Age: data.Age,
          Address: data.Address,
          Contact: data.Contact
        }
        this.empService.saveEmployee(_employee).subscribe(
          employee => {
            if(_isNew) {
              this.gridApi.applyTransaction({ add: [employee] })
              alert("Employee added Successfully!")
            } else {
              params.node.setData(employee);
              alert("Employee updated Successfully!")
            }            
          }
        )
      }
    });
  }

  DeleteEmployee(params) {
    const data: IEmployee = params.data;
    this.empService.deleteEmployeeById(data.Id).subscribe(
      success => {
        if (success) {
          this.gridApi.applyTransaction({ remove: [params.data] });
          this.gridApi.redrawRows()
          alert("Employee deleted Successfully!")
        }
      }
    )
  }

}
