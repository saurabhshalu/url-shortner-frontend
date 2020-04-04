import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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
