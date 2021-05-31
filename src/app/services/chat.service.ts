import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { MENSAJE_PARA_SALA, MENSAJE_DeLa_SALA, MENSAJE_PRIVADO,
         CLIENTES_ACTIVOS, CLIENTES_OBTENER } from '../config/socket.events';

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
    this.wsService.emitir( MENSAJE_PARA_SALA, payload ); //'mensaje'
    // this.wsService.emitir('mensaje', payload );
  }

  receiveNessages ( ) {
    return this.wsService.escuchar( MENSAJE_DeLa_SALA );   // 'mensaje-nuevo'
    // return this.wsService.escuchar('mensaje-nuevo');
  }

  // 43. Reconectar y renombrar usuario en el Socket Server
  mensajePrivadoGet () { // Regresa un Observable que está escuchando
    // return this.wsService.escuchar('mensaje-privado'); // escuchar mensaje privado.
    return this.wsService.escuchar( MENSAJE_PRIVADO );  // 'mensaje-privado'
  }

  // 53. Componente de Lista de Usuarios
  clientesActivosGet() {
    return this.wsService.escuchar( CLIENTES_ACTIVOS );
  }

  // 54. Tarea - Obtener lista de usuarios - socket
  clientesOnChatGet() {
    this.wsService.emitir ( CLIENTES_OBTENER );
  }
  
}
