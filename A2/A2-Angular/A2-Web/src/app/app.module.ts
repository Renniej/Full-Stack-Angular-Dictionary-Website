import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'

import { HomeBarComponent } from './home-bar/home-bar.component';
import { ListTermEnglishComponent } from './list-term-english/list-term-english.component';
import { ListTermNonEnglishComponent } from './list-term-non-english/list-term-non-english.component';
import { ListDefinitionsComponent } from './list-definitions/list-definitions.component';
import { TermDetailsComponent } from './term-details/term-details.component';
import { TermEditComponent } from './term-edit/term-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeBarComponent,
    ListTermEnglishComponent,
    ListTermNonEnglishComponent,
    ListDefinitionsComponent,
    TermDetailsComponent,
    TermEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
