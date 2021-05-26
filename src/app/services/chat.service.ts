import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { MSGparaSALA, MSGdeLaSALA, MSGprivado } from '../config/socket.events';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor( public wsService: WebSocketService ) { }

  sendMessage ( msg: string ) {
    const payload = {
      // de: 'Lana Rhoades',
      // 43. Reconectar y renombrar usuario en el Socket Server
      de: this.wsService.usuarioGet().nombre,
      cuerpo: msg
    };
    this.wsService.emitir( MSGparaSALA, payload ); //'mensaje'
    // this.wsService.emitir('mensaje', payload );
  }

  receiveNessages ( ) {
    return this.wsService.escuchar(MSGdeLaSALA);   // 'mensaje-nuevo'
    // return this.wsService.escuchar('mensaje-nuevo');
  }

  // 43. Reconectar y renombrar usuario en el Socket Server
  mensajePrivadoGet () { // Regresa un Observable que está escuchando
    // return this.wsService.escuchar('mensaje-privado'); // escuchar mensaje privado.
    return this.wsService.escuchar( MSGprivado );  // 'mensaje-privado'
  }

}
