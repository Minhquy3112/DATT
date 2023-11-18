import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/common/auth';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private seller: SellerService, private router: Router) { }

  authError: string = ''
  ngOnInit(): void {
    // this.seller.sellerAuthReload()
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data)
    this.router.navigate([''])
  }









  openSignUp() {
    // this.showSign = false
  }

}
