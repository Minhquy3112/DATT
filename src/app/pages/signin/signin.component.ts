import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/common/auth';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  constructor(private seller: SellerService, private router: Router) { }
  // showSignIn = false
  authError: string = ''
  ngOnInit(): void {

  }




  signIn(data: SignIn): void {
    this.authError = '';
    this.seller.userSignIn(data);
    this.seller.invalidSellerAuth.subscribe((isError) => {
      if (isError) {
        this.authError = "Email không tồn tại"
      }
    })
  }


  // openSignIn() {
  //   this.showSignIn = true
  // }




}
