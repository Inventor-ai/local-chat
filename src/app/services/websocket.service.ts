import { Injectable } from '@angular/core';
// Leccion??
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public isServerOnLine = false;

  constructor( private socket: Socket ) {
    this.checkServerStatus();
   }

  checkServerStatus() {
    this.socket.on('connect', ()=> {
      console.log('Servidor conectado');
      this.isServerOnLine = true;
    });

    this.socket.on('disconnect', ()=> {
      console.log('Servidor desconectado');
      this.isServerOnLine = false;
    });
  }

  // 28. Emitir un mensaje mediante sockets al servidor
  emitir ( evento: string, payload?: any, callBack?: Function) {
    // emitir ( 'EVENTO', payload, callBack )
    this.socket.emit( evento, payload, callBack );
  }

  // 30. Escuchar emisión desde el servidor
  escuchar( evento: string ) {
    return this.socket.fromEvent( evento );
  }

}
