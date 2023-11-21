import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { EditorAgendasComponent } from './vistas/agendas/editor-agendas/editor-agendas.component';


@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ludoteca-9561e","appId":"1:857823905548:web:333bc4d1d6781bb65aeb29","storageBucket":"ludoteca-9561e.appspot.com","apiKey":"AIzaSyBWV_cWTqpHrSJQcm07BH84n6q8j4K0gnc","authDomain":"ludoteca-9561e.firebaseapp.com","messagingSenderId":"857823905548"})),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
