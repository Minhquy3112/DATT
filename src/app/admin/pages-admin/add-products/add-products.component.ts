import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router'
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  submit=false;
  constructor(private prodSrv: ProductService, private router: Router ) { }
  productFormCreate: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    price: new FormControl("",Validators.required),
    image: new FormControl("",Validators.required),
    description: new FormControl("",[Validators.required, Validators.minLength(10)])
  });
  ngOnInit(): void {
  }
  get sub (){
    return this.productFormCreate.controls
  }
  onCreate(){
    this.submit = true;
    console.log(this.productFormCreate.invalid);
    
    if(this.productFormCreate.invalid){
      return;
    }
    this.prodSrv.Create(this.productFormCreate.value).subscribe(data => {
      console.log(data);
      this.router.navigate(['admin/products'])
    })
    
  }
}
