import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  EmployeeDialogForm = this.fb.group({
    Name: [, Validators.required],
    Age: [, Validators.required],
    Address: [, Validators.required],
    Contact: [, Validators.required]
  });

  status: string = "";
  Id: number=0;
  Name: string = "";
  Age: string = "";
  Address: string = "";
  Contact: string = "";
  errormsg:string="";
  value:string="";
  constructor(@Inject(MAT_DIALOG_DATA) public data, private fb: FormBuilder, 
  public snackBar: MatSnackBar,public dialogref: MatDialogRef<EmployeeDialogComponent>) { }

  ngOnInit() {
    this.status = this.data.Status;
    if (this.status == "Update") {
      this.EmployeeDialogForm.controls['Name'].setValue(this.data.data.Name);
      this.EmployeeDialogForm.controls['Age'].setValue(this.data.data.Age);
      this.EmployeeDialogForm.controls['Address'].setValue(this.data.data.Address);
      this.EmployeeDialogForm.controls['Contact'].setValue(String(this.data.data.Contact));
      this.Id = this.data.data.Id;
      // this.Name = this.data.data.Name;
      // this.Age = this.data.data.Age;
      // this.Address = this.data.data.Address;
      // this.Contact = String(this.data.data.Contact);
    }
  }
  SaveStudentData() {
    if (this.EmployeeDialogForm.controls.Name.value == ""||this.EmployeeDialogForm.controls.Name.value == null) {
      this.errormsg="Please enter Name !!";
      this.value="warning";
      return;
    }
    else if (this.EmployeeDialogForm.controls.Age.value == ""||this.EmployeeDialogForm.controls.Age.value == null) {
     this.errormsg="Please enter Age !!";
      this.value="warning";
      return;
      
    }
    
    else if (this.EmployeeDialogForm.controls.Address.value == ""||this.EmployeeDialogForm.controls.Address.value == null) {
      this.errormsg="Please enter Address !!";
      this.value="warning";
      return;
    }
    else if (this.EmployeeDialogForm.controls.Contact.value == ""||this.EmployeeDialogForm.controls.Contact.value == null) {
      this.errormsg="Please enter Contact !!";
      this.value="warning";
      return;
    }
    else if(this.EmployeeDialogForm.controls.Contact.value.length!=10){
      this.errormsg="Please enter 10 digit contact number !!";
      this.value="warning";
      return;
    }
    var outputObj={
      Id:this.Id,
      Name:this.EmployeeDialogForm.controls.Name.value,
      Age:this.EmployeeDialogForm.controls.Age.value,
      Address:this.EmployeeDialogForm.controls.Address.value,
      Contact:this.EmployeeDialogForm.controls.Contact.value
    }
    this.dialogref.close(outputObj)
  }
  onlyintegers(event): any {
    var reg = /^[0-9\b ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!reg.test(inputChar)) {
      event.preventDefault();
    }
  }
  removespcialcharactersandnumbers(event): any {
    var reg = /^[a-zA-Z&()\b ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!reg.test(inputChar)) {
      event.preventDefault();
    }
  }
  Close(){
    this.dialogref.close();
  }

}
