import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignIn, SignUp } from 'src/app/common/auth';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  constructor(private seller: SellerService, private router: Router) { }
  showSignIn = false
  authError: string = ''
  ngOnInit(): void {

  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data)
    this.router.navigate([''])
  }



  signIn(data: SignIn): void {
    this.authError = '';
    this.seller.userSignIn(data);
    this.seller.isSignInError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email hoặc mật khẩu không chính xác"
      }
    })
  }


  openSignIn() {
    this.showSignIn = true
  }

  
  openSignUp() {
    this.showSignIn = false
  }
}
