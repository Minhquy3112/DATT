import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Banner } from 'src/app/common/banner';
import { Products } from 'src/app/common/product';
import { BannerService } from 'src/app/services/banner.service';
import { ProductService } from 'src/app/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Array<Products> = new Array<Products>();
  products1: Array<Products> = new Array<Products>();
  products2: Array<Products> = new Array<Products>();
  products4: Array<Products> = new Array<Products>();
  banners: Array<Banner> = new Array<Banner>();
  searchText=""
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private product: ProductService, private banner: BannerService) { }

  ngOnInit(): void {
    this.product.getProducts().subscribe(res => {
      this.products = res;
    })
    this.product.getProducts8(8).subscribe(res => {
      this.products4 = res;
    })

    this.banner.getBanners().subscribe(res => {
      this.banners = res;
    })
  }



}
