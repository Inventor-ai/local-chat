import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebSocketService ) { }

  sendMessage ( msg: string ) {
    const payload = {
      de: 'Lana Rhoades',
      cuerpo: msg
    };
    this.wsService.emitir('mensaje', payload );
  }

  receiveNessages ( ) {
    return this.wsService.escuchar('mensaje-nuevo');
  }
}
