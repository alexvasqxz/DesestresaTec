import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { AboutComponent } from './components/about/about.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormularyComponent } from './components/formulary/formulary.component';



const routes: Routes = [
  { path: 'main', component: MainComponent},
  { path: 'doctors', component:DoctorsComponent},
  {path: 'about', component:AboutComponent},
  {path: 'resources', component:ResourcesComponent},
  {path: 'user', component:UserComponent},
  {path: 'sign', component:SignupComponent},
  {path: 'form', component:FormularyComponent},
  {path: '', redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
