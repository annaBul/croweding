import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService{
    constructor(private http:Http){
        
    }
    getProject(title){
        return this.http.get('http://localhost:3000/project/' + title)
            .map(res => res.json());
    }

    createProject(newProject){
        if(localStorage.getItem('currentUser')){
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', currentUser.token); 
            return this.http.post('http://localhost:3000/create_project', JSON.stringify(newProject), {headers: headers})
                .map(res => res.json());
        }
    }
}