import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser;
  user;
  constructor(private userService:UserService) {
    
   }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    } 

    this.userService.getUserSettings(this.currentUser.id)
    .subscribe(res => {
      if(!res.error){
        if(res.user){
          this.user = res.user;
        }
      }
    });
  }
  saveChanges($event): void{
    event.preventDefault();

    this.userService.saveSettingChanges(this.user)
        .subscribe(res => {
          if(!res.error){
            if(res.token && res.username && res.id){
              localStorage.setItem('currentUser', JSON.stringify({ token: res.token, username: this.user.username, id: res.id }));
            }
         }
        });
  }

}
