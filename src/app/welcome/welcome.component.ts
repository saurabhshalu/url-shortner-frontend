import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  myurl: string = '';
  public onButtonClickFunction(): void {
    // var test = this.greet()
    // test.subscribe(res=>{
    //   console.log(res);
    // },err=> {
    //   console.log(err);
    // })
    // console.log(this.greet());
    var data = {
      url: this.myurl
    }

    this.http.post('http://localhost:9000/.netlify/functions/api/save',JSON.stringify(data)).subscribe(res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    });

  }

  greet() : Observable<string> {
    return this.http.get<string>('http://localhost:9000/.netlify/functions/api/random').pipe(
      retry(1),
      catchError(()=> {
        return EMPTY;
      }),
      shareReplay()
    )
  }

}
