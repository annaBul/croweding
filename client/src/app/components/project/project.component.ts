import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import { ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  title;
  project;


  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute,
    private projectService: ProjectService){

      this.routeSubscription = route.params.subscribe(params=>this.title=params['title']);

      this.projectService.getProject(this.title)
      .subscribe(res => {
        if(!res.error){
          this.project = res.project;
        }
       }
      );
  }
  


  ngOnInit() {
    
  }

}
