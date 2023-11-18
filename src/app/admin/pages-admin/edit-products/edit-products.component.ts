import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/common/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit{
  id: string = '';
  submit= false;
  products: Array<Products> = [];
  constructor(private prodSrv: ProductService, private route: ActivatedRoute, private router: Router) { }
  productFormEdit: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    price: new FormControl("",Validators.required),
    image: new FormControl("",Validators.required),
    description: new FormControl("",[Validators.required, Validators.minLength(10)])
  });

  ngOnInit(): void {
  //  console.log(this._route.snapshot.params);
   const id = this.route.snapshot.params['id'];
   
   this.prodSrv.getDetail(id).subscribe(data => {
    this.productFormEdit = new FormGroup({
      name: new FormControl(data.name,Validators.required),
      price: new FormControl(data.price,Validators.required),
      image: new FormControl(data.image,Validators.required),
      description:new FormControl(data.description,[Validators.required, Validators.minLength(10)])
    });
    
   });
   
  }

  get sub(){
    return this.productFormEdit.controls
    
    
  }
  
  onUpdate(){
    this.submit = true;
    console.log(this.productFormEdit.invalid);
    if(this.productFormEdit.invalid){
      return;
    }
    this.prodSrv.Update(this.route.snapshot.params['id'], this.productFormEdit.value).subscribe(data => {
      console.log(data);
    })
    this.router.navigate(['admin/products'])
  }
}
