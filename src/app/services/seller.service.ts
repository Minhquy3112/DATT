import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http"
import { ListUser, SignIn, SignUp } from '../common/auth';
import {  Router } from '@angular/router';
import { BehaviorSubject, observeOn } from 'rxjs';

const _api = 'http://localhost:3000/'


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  isSignInError = new EventEmitter<boolean>(false)
  invalidSellerAuth= new EventEmitter<boolean>(false)


  constructor(private http:HttpClient, private router: Router) { }

  userSignUp(seller:SignUp){
    this.http.post('http://localhost:3000/seller',
    seller,
    {observe: 'response'}).subscribe((result) => {
      // console.warn(result);
      if (result) {
        // localStorage.setItem('seller', JSON.stringify(result.body));
        alert("Bạn đã đăng ký thành công")
        this.router.navigate(['signin'])
      }

    })

  }

  userSignIn(data: SignIn) {
    this.http
      .get<SignUp[]>(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        // console.log(result.body[0]['role'] == 'admin');
        if (result && result.body?.length && result.body[0]['role'] == 'admin' ) {
          localStorage.setItem('admin', JSON.stringify(result.body[0]));
          this.router.navigate(['admin/']);
          this.invalidSellerAuth.emit(false);
        } else if (result && result.body?.length) {
          localStorage.setItem('seller', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invalidSellerAuth.emit(false);
        } else {
          this.invalidSellerAuth.emit(true);
        }
      });
  }

  // sellerAuthReload() {
  //   if (localStorage.getItem("seller")) {
  //     this.router.navigate(["/"])
  //   }
  // }

  getUsers(){
    return this.http.get<Array<ListUser>>(_api + 'seller');
  }
}
