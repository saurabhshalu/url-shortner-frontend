import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css']
})
export class RedirectorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.params.subscribe(
      params => {
        var data = {
          code: params.id
        }
    
        this.http.post('http://localhost:9000/.netlify/functions/api/get',JSON.stringify(data)).subscribe(res=>{
          console.log(res)

          window.location.href = res['url'];
        },
        err=>{
          console.log(err)
        });
      }
    )
  }

  ngOnInit(): void {
  }
}
