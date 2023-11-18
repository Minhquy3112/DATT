import { Component, OnInit } from '@angular/core';

import { Products } from 'src/app/common/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {
  products: Array<Products> = [];
  
  constructor(private proSrv: ProductService) { }

  ngOnInit(): void {
    this.proSrv.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  onDelete(id: string){
    if(confirm("Bạn có muốn xóa không")){
      this.proSrv.Delete(id).subscribe(data =>{
        this.proSrv.getProducts().subscribe(data => {
        this.products = data;
      })
    })
    }

  }

  onEdit(product: any ){

  }
  
}
