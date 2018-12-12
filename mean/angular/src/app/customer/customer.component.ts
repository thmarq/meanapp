import { Component, OnInit } from '@angular/core';
//import { Observable} from 'rxjs';
import { NgForm } from '@angular/forms';
import { Customer } from '../shared/customer.model';
import {CustomerService } from '../shared/customer.service'

declare var  M :any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers:[CustomerService],


})
export class CustomerComponent implements OnInit {

  constructor(private cs:CustomerService) { }

  ngOnInit() {
    this.resetForm();
    this.onSubmit;
    this.refreshcustomerlist();
    this.onEdit;
    
    
  }

resetForm(form?:NgForm){
  if(form)
  form.reset();
  this.cs.selectedCustomer={
    _id :"",
    name : "",
    address: "",
    phone_no : null,
    room_no : null,
    amount : null,
  }
}

onSubmit(form: NgForm){
   if(form.value._id=="")
  {
  this.cs.postCustomer(form.value).subscribe((resp)=>{
    this.resetForm(form);
    this.refreshcustomerlist();
    M.toast({html:"save succesfully",classes:'rounded'});
    });
  }
 else
 {
  this.cs.putCustomer(form.value).subscribe((resp)=>{
    this.resetForm(form);
    this.refreshcustomerlist();
    M.toast({html:"Updated successfully",classes:'rounded'});
    });
}
}

refreshcustomerlist(){
this.cs.getCustomer().subscribe((resp)=>{
this.cs.Customers=resp as Customer[];
});
}

onEdit(cust:Customer)
{
 this.cs.selectedCustomer=cust;
}


onDelete(_id:string,form : NgForm){
  if(confirm('Are u sure to delete this record?') == true)
  {
    this.cs.deleteCustomer(_id).subscribe((res)=>{
      this.refreshcustomerlist();
      this.resetForm(form);
      M.toast({html:"Deleted succesfully",classes:"rounded"});
    })
  }
}
}
