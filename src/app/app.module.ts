import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// 24. Angular - Conectarnos a nuestro servidor (de sockets)
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
// const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };
const config: SocketIoConfig = { url: environment.webSocketURL, options: {} };

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';

import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';  // 29. Interfaz visual para enviar mensajes 1/2

import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    ListaUsuariosComponent,
    LoginComponent,
    MensajesComponent
  ],
  imports: [
    BrowserModule, 
    SocketIoModule.forRoot(config),  // ?? Lección...
    FormsModule,                     // 29. Interfaz visual para enviar mensajes 2/2
    AppRoutingModule                 // 37. Implementando un sistema de rutas en Angular
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
