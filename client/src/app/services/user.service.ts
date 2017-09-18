import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService{
    constructor(private http:Http){
        
    }
    
    getUser(id){
        return this.http.get('http://localhost:3000/user/' + id)
            .map(res => res.json());
    }    

    getUserSettings(id){
        return this.http.get('http://localhost:3000/user/' + id+'/settings')
            .map(res => res.json());
    }   

    saveSettingChanges(user){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/user/'+user.id+'/settings', JSON.stringify(user), {headers: headers})
            .map(res => res.json());
    }
}