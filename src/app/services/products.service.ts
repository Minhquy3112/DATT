import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products, cart } from '../common/product';
import { Router } from '@angular/router';

const _api = 'http://localhost:3000/'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<Products[] | []>()
  constructor(private http: HttpClient, private router: Router) { }

  getProducts(search_key:any =null,): Observable<Array<Products>> {
    let url = _api+ "products"
    if(search_key !=null){
      url += "?name_like=" +search_key
    }
    return this.http.get<Array<Products>>(url);
  }

  getProducts8(search_key:any =null,): Observable<Array<Products>> {
    let url = _api+ "products/?_limit=8"
    if(search_key !=null){
      url += "?name_like=" +search_key
    }
    return this.http.get<Array<Products>>(url);
  }
  


  getDetail(id: string): Observable<Products> {
    return this.http.get<Products>(_api + 'products/' + id);
  }

  Create(data: any): Observable<Array<Products>> {
    return this.http.post<Array<Products>>( _api + 'products', data);

  }

  Update(id: string, data: any): Observable<Array<Products>> {
    return this.http.put<Array<Products>>(_api + 'products/' + id, data);
  }

  Delete(id: string): Observable<Array<Products>> {
    return this.http.delete<Array<Products>>(_api + 'products/' + id);
  }


  localAddToCart(data:Products){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));

    }
    this.cartData.emit(cartData)
  }
  
  removeItemFromCart( id: string){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
        let items : Products[] = JSON.parse(cartData);
        items = items.filter((item: Products) => id !== item.id);
        localStorage.setItem('localCart', JSON.stringify(items));
        this.cartData.emit(items);
      }
  }
  addToCart(cartData:cart){
    return this.http.post<Array<Products>>('http://localhost:3000/cart', cartData);
  }

}
