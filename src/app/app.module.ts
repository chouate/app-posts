import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { FormPostComponent } from './components/form-post/form-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { ModalComponent } from './modals/modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularInMemoryWebApiService } from './angular-in-memory-web-api.service';

@NgModule({
  declarations: [
    AppComponent,
    ListPostsComponent,
    FormPostComponent,
    FilterPipe,
    ModalComponent,
    
  ],
  imports: [
    //HttpClientInMemoryWebApiModule.forRoot(AngularInMemoryWebApiService, { dataEncapsulation: false}),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
