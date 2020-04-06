import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RedirectorComponent } from './redirector/redirector.component';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: ':id',
    component: RedirectorComponent
  },
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
