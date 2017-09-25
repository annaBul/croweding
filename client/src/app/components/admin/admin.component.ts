import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users = [];
  error ='';

  constructor(private adminService:AdminService) {
    this.adminService.getUsers()
    .subscribe(res => {
      if(res.users){          
        this.users = res.users;
         
      }
     });
   }

  ngOnInit() {
  }

  changeUserBlocked(user){
    this.adminService.changeUserBlocked(user['_id'])
    .subscribe(res => {
      if(res.error){          
        this.error = res.error;
      } else {
        this.error = '';
        user.blocked = !user.blocked;
      }
    });
  }

  changeUserRole(newRole, user){
    console.log(newRole);
    var modifiableUser = {
      id: user['_id'],
      newRole: newRole    
    }
    this.adminService.changeUserRole(modifiableUser)
    .subscribe(res => {
      if(res.error){          
        this.error = res.error;
      } else {
        this.error = '';
      }
    });
  }

}
