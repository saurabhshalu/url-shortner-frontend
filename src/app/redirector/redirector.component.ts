import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css']
})
export class RedirectorComponent implements OnInit {

  loading: boolean = true;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(
      params => {
        var data = {
          code: params.id.replace('$',''),
          type: 'open'
        }
        if(params.id.slice('-1')=='$') {
          window.location.href = '/'
        }
        else {
          this.http.post('https://dropurlbackend.netlify.com/.netlify/functions/api/getdata',JSON.stringify(data)).subscribe(res=>{
            console.log(res);
            window.location.href = res['url'];
          },
          err=>{
            console.log(err)
            this.loading = false;
          });
        }
      }
    )
  }

  ngOnInit(): void {
  }
}
