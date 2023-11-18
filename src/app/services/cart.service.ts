import { EventEmitter, Injectable } from '@angular/core';
import { Products, cart } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const _api = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartData = new EventEmitter<Products[] | []>()


  constructor(private http: HttpClient) { }


  Delete(id: string): Observable<Array<cart>> {
    return this.http.delete<Array<cart>>(_api + 'cart/' + id);
  }

  getCart(userId: string) {
    return this.http.get<Products[]>(_api + 'cart?userId=' + userId, {
      observe: 'response'
    }).subscribe((data) => {
      if (data && data.body) {
        this.cartData.emit(data.body);
      }
    })
  }
  
  currentCart() {
    let sellerStore = localStorage.getItem('seller');
    let sellerData = sellerStore && JSON.parse(sellerStore);
    return this.http.get<cart[]>(_api + 'cart?userId='+sellerData.id)
  }

  listCart(){
    return this.http.get<Array<cart>>(_api + 'cart');
  }
}
