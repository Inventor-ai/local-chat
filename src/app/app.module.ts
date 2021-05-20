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
// 29. Interfaz visual para enviar mensajes 1/2
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule, 
    SocketIoModule.forRoot(config),
    FormsModule  // 29. Interfaz visual para enviar mensajes 2/2
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
