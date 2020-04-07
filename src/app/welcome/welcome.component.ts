import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';


declare var Particles: any;


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    
    window.onload = function() {
      Particles.init({
        selector: '#particles-js',
        maxParticles: 300
      });
    };
  }
  myurl: string = '';
  status: boolean = false;
  about: boolean = false;
  history: any = null;

  aboutClick(toggle: string) : void {
    if(toggle == 'toggle') {
      if(this.about==false) {
        document.getElementById('cards').classList.add('cardsnew');
      }
      else {
        document.getElementById('cards').classList.remove('cardsnew');
      }
      this.about = !this.about;
    }
    else {
      document.getElementById('cards').classList.remove('cardsnew');
      this.about = false;
    }
    
  }

  validClass() {
    document.getElementById('url').classList.remove('invalid');
    document.getElementById('url').classList.add('valid');
  }
  invalidClass() {
    document.getElementById('url').classList.remove('valid');
    document.getElementById('url').classList.add('invalid');
  }
  removeValidInvalid() {
    document.getElementById('url').classList.remove('valid');
    document.getElementById('url').classList.remove('invalid');
  }

  copiedClass() {
    document.getElementById('shortenurl').classList.add('copy-class');
  }

  removeCopiedClass() {
    document.getElementById('shortenurl').classList.remove('copy-class');
    document.getElementById('shortenurl').innerHTML = 'MINIFY';
    this.history = null;
  }

  addHistoryClass() {
    document.getElementById('shortenurl').innerHTML = 'statistics';
  }

  isValidURL() {
    if(this.myurl.slice(-1)!=='$' && document.getElementById('shortenurl').innerHTML !== 'MINIFY') {
      this.removeCopiedClass();
      return;
    }
    if(this.myurl.slice(-1)=='$' && this.myurl.indexOf('amini.ml')>0) {
      this.addHistoryClass();
    }
    var regex = new RegExp("^((https{0,1}|ftp|rtsp|mms){0,1}://){1}(([0-9a-z_!~\\*'\\(\\)\\.&=\\+\\$%\\-]{1,}:\\ ){0,1}[0-9a-z_!~\\*'\\(\\)\\.&=\\+\\$%\\-]{1,}@){0,1}(([0-9]{1,3}\\.){3,3}[0-9]{1,3}|([0-9a-z_!~\\*'\\(\\)\\-]{1,}\\.){0,}([0-9a-z][0-9a-z\\-]{0,61}){0,1}[0-9a-z]\\.[a-z]{2,18}|localhost)(:[0-9]{1,4}){0,1}((/{0,1})|(/[0-9a-z_!~\\*'\\(\\)\\.;\\?:@&=\\+\\$,%#\\-]{1,}){1,}/{0,1})$","gi");
    this.status = regex.test(this.myurl);
    if(this.myurl.length>0) {
      if(this.status) {
        this.validClass();
      }
      else {
        this.invalidClass();
      }
    }
    else {
      this.removeValidInvalid();
    }
    return this.status;
  }


  copyTextToClipboard(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    document.getElementById('shortenurl').innerHTML = "COPIED!";
    this.copiedClass();
  }


  ShortenURLWithRetry() : Observable<any> {
    var data = {
      url: this.myurl
    }
    return this.http.post('https://dropurlbackend.netlify.com/.netlify/functions/api/save',JSON.stringify(data)).pipe(
      retry(5),
      catchError(()=> {
        return EMPTY;
      }),
      shareReplay(),
    )
  }


  ShortenURL() : void {
    if(this.myurl.indexOf('amini.ml')>0) {

      if(this.myurl.slice(-1)!='$') {
        this.myurl = "can't shorten specified url";
        this.status = false;
        this.invalidClass();
        this.removeCopiedClass();
        return;
      }
      else {
          var data = {
            code: this.myurl.slice(this.myurl.lastIndexOf('/')+1,this.myurl.lastIndexOf('$')),
            type: 'history'
          }
          //console.log(data.code);
          this.http.post('https://dropurlbackend.netlify.com/.netlify/functions/api/getdata',JSON.stringify(data)).subscribe(res=>{
            //console.log(res);
            this.history = res;
          },
          err=>{
            //console.log(err)
            this.history = null;
          });
      }
      return;
    }
    if(this.status && document.getElementById('shortenurl').innerHTML == 'MINIFY') {  
      document.getElementById('shortenurl').setAttribute('disabled','disabled');
      var shorten = this.ShortenURLWithRetry();
      shorten.subscribe(res=>{
        //console.log(res)
        this.myurl = 'https://amini.ml/' + res['code'];
        this.copyTextToClipboard(this.myurl);
        document.getElementById('shortenurl').removeAttribute('disabled');
      },err=> {
        //console.log(err)
        document.getElementById('shortenurl').removeAttribute('disabled');
      });
    }
    else {
      document.getElementById('url').focus();
    }
  }
}
