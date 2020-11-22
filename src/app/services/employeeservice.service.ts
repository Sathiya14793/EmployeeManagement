import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

export interface IEmployee {
  Id: number;
  Name: string;
  Age: number;
  Address: string;
  Contact: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  private max_id: number = 10;
  private _intial_data: IEmployee[] = [
    {
      Id: 1, Name: "Sathiya Narayanan G", Age: 27, Address: "55 B/2 Sarong Street, Cuddalore OT", Contact: 9688153185
    },
    {
      Id: 2, Name: "Kannan B", Age: 34, Address: "27 Periyar Street, Erode", Contact: 7837838939
    },
    {
      Id: 3, Name: "Senthil Kumar S", Age: 26, Address: "113, TTK Road, Thiruvarur", Contact: 9873673876
    },
    {
      Id: 4, Name: "Sheik Abdullah R", Age: 34, Address: "B-1, Mosque Street, Ramnad", Contact: 7899875678
    },
    {
      Id: 5, Name: "Wazeed Shaik", Age: 29, Address: "09 SLV Colony, Palakad", Contact: 8897898734
    },
    {
      Id: 6, Name: "Nandhini C", Age: 29, Address: "114, ARR Road, Kumbakonam", Contact: 7876353639
    },
    {
      Id: 7, Name: "Goutham R", Age: 31, Address: "98, Naveen Salai, Chrompet", Contact: 9898078987
    },
    {
      Id: 8, Name: "Manoj Kumar BK", Age: 27, Address: "56, TVS Road, Royapettah", Contact: 8798767898
    },
    {
      Id: 9, Name: "Sushil Kumar G", Age: 35, Address: "14,AST Flats,Shozhinganalur ", Contact: 8909878979
    },
    {
      Id: 10, Name: "Sreevas P", Age: 37, Address: "27, AST Flats, Shozhinganalur", Contact: 7678987689
    }
  ];

  constructor() { }

  getEmployees(): Observable<IEmployee[]> {
    return new Observable<IEmployee[]>((observer) => {
      observer.next(this._intial_data);
      observer.complete();
    });
  }

  getEmployeeById(Id: number): Observable<IEmployee> {
    return new Observable<IEmployee>((observer) => {
      const employee = this._intial_data.find(s => s.Id == Id);
      observer.next(employee);
      observer.complete();
    });
  }

  saveEmployee(employee: IEmployee): Observable<IEmployee> {
    return new Observable<IEmployee>((observer) => {
      if (employee.Id == 0) {
        employee.Id = ++this.max_id;
      }
      const _employee: IEmployee = { ...employee };
      const _index = this._intial_data.findIndex(s => s.Id == _employee.Id);
      if (_index < 0) {
        // Create New
        this._intial_data.push(_employee);
      } else {
        // Update Existing
        this._intial_data[_index] = _employee;
      }
      observer.next(_employee);
      observer.complete();
    });
  }

  deleteEmployeeById(Id: number): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const _index = this._intial_data.findIndex(s => s.Id == Id);
      if (_index > -1) {
        this._intial_data.splice(_index, 1);
        observer.next(true);
      } else {
        observer.next(false);
      }
      observer.complete();
    });
  }
}
