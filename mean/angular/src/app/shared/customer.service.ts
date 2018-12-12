import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/observable';
import'rxjs/add/operator/map';
import'rxjs/add/operator/toPromise';

import{ Customer } from './customer.model';

@Injectable()
export class CustomerService {
  selectedCustomer:Customer;
  Customers:Customer[];

  readonly baseURL ='http://localhost:8080/customers';
  constructor(private http : HttpClient) { }

  postCustomer(custe : Customer){
    return this.http.post(this.baseURL, custe);
  }
  getCustomer(){
    return this.http.get(this.baseURL);
  }

  putCustomer(cust : Customer){
    return this.http.put(this.baseURL + `/${cust._id}`,cust);
  }
  deleteCustomer(_id:string){
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
