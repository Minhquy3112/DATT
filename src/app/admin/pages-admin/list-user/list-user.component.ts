import { Component } from '@angular/core';
import { ListUser } from 'src/app/common/auth';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {
  users: Array<ListUser> = [];
  constructor (private selSrv: SellerService){}
  ngOnInit(): void {
    this.selSrv.getUsers().subscribe((result) => {
      this.users = result
    })
  }
}
