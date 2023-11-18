import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { cart } from 'src/app/common/cart';
import { Products } from 'src/app/common/product';

import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  productQuantity:number=1;
  removecart=false; 
  
  

  products:Products = new Products;

  // products: Array<Products> = [];
  id: string = '';
  productDetail: FormGroup = new FormGroup({

    quantity: new FormControl(),

  });

  constructor(private proSrv: ProductService,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
   const id = this.activatedRoute.snapshot.params['id'];
    this.proSrv.getDetail(id).subscribe(data => {

      this.products = data;


      let cartData = localStorage.getItem('localCart');
      if (id && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item : Products) => id === item.id.toString());
        if(items.length){
          this.removecart=true;
        }
        else{
           this.removecart=false;
      }
      }
    })

  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val==='max'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  }

  
  AddToCart(){
    if(this.products){
      this.products.quantity = this.productQuantity
      this.proSrv.localAddToCart(this.products)
      if (!localStorage.getItem('seller')) {
        this.proSrv.localAddToCart(this.products)
        this.removecart=true; 
      }else{
       
        let user = localStorage.getItem('seller');
        let userId = user && JSON.parse(user).id;
        let userName = user && JSON.parse(user).name;
        
        let cartData: cart  = {
          ...this.products,
          userId,
          productId: this.products.id,
          userName,
        }
        // delete cartData.id;
      
        this.proSrv.addToCart(cartData).subscribe((result)=>{
            if(result){
              alert("Bạn đã thêm vào giỏ hàng thành công")
            }
        })
      }

    }
  }



}
