import { Component } from '@angular/core';
import { Products } from 'src/app/common/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {

  products: Array<Products> = new Array<Products>();
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.getProducts().subscribe(res => {
      this.products = res;
    })
  }
  searchText=''
    

}
