import { Component } from '@angular/core';
import { cart } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  carts: cart[] | undefined;

  constructor(private cartSrv: CartService) { }

  ngOnInit(): void {
    this.cartSrv.currentCart().subscribe((result) => {
      this.carts = result
    })
  }

  onDelete(id: string) {
    if (confirm("Bạn có muốn xóa không")) {
      this.cartSrv.Delete(id).subscribe(data => {
        this.cartSrv.currentCart().subscribe((result) => {
          this.carts = result
        })
      })
    }

  }

  onEdit(cart: any) {

  }
}
