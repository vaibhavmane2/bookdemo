import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { UserComponent } from './user/user.component'
import {BrowserModule} from '@angular/platform-browser'
import { MaterialModule } from './material/material.module'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import {ProgressComponent} from './user/progress/progress.component'

const routes: Routes = [
  {path: 'home' , component: UserComponent},
  {path: '' , component: UserComponent , pathMatch: 'full'}
]
@NgModule({
  declarations: [UserComponent,HeaderComponent,ProgressComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,ReactiveFormsModule,FormsModule,HeaderComponent,ProgressComponent]
})
export class AppRoutingModule { }
