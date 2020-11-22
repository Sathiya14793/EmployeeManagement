import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { IEmployee, EmployeeserviceService } from '../services/employeeservice.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
      { field: 'SNo', valueFormatter: (params) => (params.node.childIndex + 1),  width: 80, resizable: true },
      { field: 'Id',headerName: 'Emp. Id', sortable: true, width: 100, resizable: true },
      { field: 'Name', sortable: true, resizable: true, cellStyle: { color: 'blue', 'cursor': 'pointer' } },
      { field: 'Age', sortable: true,width: 100, resizable: true },
      { field: 'Address', width: 380, resizable: true },
      { field: 'Contact',  resizable: true },
      {
        field: 'Action', valueFormatter: (params) => "Delete",  resizable: true, cellStyle: { color: 'Red', 'cursor': 'pointer' }
      },
      
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
    
    if (params.colDef.field == "Action") {
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
    const dialogConfirm = new MatDialogConfig();
    dialogConfirm.disableClose = true;
    dialogConfirm.autoFocus = true;
    dialogConfirm.data = {
      //id:ID,
      title: 'Confirm',
      content: 'Are you sure want to delete ? ',
      actionType: 'delete'
    };
    const dialog = this.dialog.open(ConfirmDialogComponent, dialogConfirm);
    dialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        const data: IEmployee = params.data;
        this.empService.deleteEmployeeById(data.Id).subscribe(
          success => {
            if (success) {
              this.gridApi.applyTransaction({ remove: [params.data] });
              this.gridApi.redrawRows()
            }
          }
        )
      }
    });
   
  }

}
