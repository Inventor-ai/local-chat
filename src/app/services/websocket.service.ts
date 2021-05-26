import { Injectable } from '@angular/core';
// 24. Angular - Conectarnos a nuestro servidor
import { Socket } from 'ngx-socket-io';
import { UsuarioModel } from '../models/usuario.model';

const USERkey = 'usuario'; // Entrada para el localStorage

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  public isServerOnLine = false;
  // Angular 12 vs Angular 6 o 7 del Video 
  // 38. Nombre de usuario y login template
  // 1. Error if not initialize when declared or in contructor
  // public usuario: UsuarioModel; // Declarada así en el video
  // =============================================================
  // Property 'usuario' has no initializer and is not definitely assigned in the constructor.ts(2564)
  // =============================================================

  // 2. Error if done as video. 41. Mantener el usuario a pesar de las reconexiones (7:05)
  // public usuario: UsuarioModel = null;
  // =============================================================
  // Type 'null' is not assignable to type 'UsuarioModel'.ts(2322)
  // =============================================================

  // Encontrado por casualidad! - Doumentar
  public usuario!: UsuarioModel;

  // Own UserList
  public userList: any[] = [];

  constructor( private socket: Socket ) {
    this.storageRead();
    this.checkServerStatus();
    // 38. Nombre de usuario y login template
    // this.usuario = new UsuarioModel ('');   // Corrige el error de inicialización 1
    // Linea comentada en la lección 41 después de probar el error de inicialización 2
   }

  checkServerStatus() {
    this.socket.on('connect', ()=> {
      // console.log('Servidor conectado');
      this.isServerOnLine = true;
    });

    this.socket.on('disconnect', ()=> {
      // console.log('Servidor desconectado');
      this.isServerOnLine = false;
    });
  }

  // 28. Emitir un mensaje mediante sockets al servidor
  emitir ( evento: string, payload?: any, callBack?: Function) {
  //emitir ( 'EVENTO', payload, callBack )
    this.socket.emit( evento, payload, callBack );
  }

  // 30. Escuchar emisión desde el servidor
  escuchar( evento: string ) {
    return this.socket.fromEvent( evento );
  }

  // 38. Nombre de usuario y login template
/*
  // Primera versión en el video.  
  loginWebSocket ( nombre: string ) {
    console.log('Configurando usuario: ', nombre );
    // this.usuario = this.usuario;
    // this.socket.emit ('configurar-usuario', { nombre: nombre }, ( resp: any ) => {
    this.socket.emit ('configurar-usuario', { nombre }, ( resp: any ) => {
      console.log('Server says: ', resp);
      console.log('But I am:', this.usuario );
    });
  }
*/
  loginWebSocket ( nombre: string ) {
    // console.log('Configurando usuario: ', nombre );
    // 41. Mantener el usuario a pesar de las reconexiones
    return new Promise((resolve, reject) => {
      // this.emitir ('configurar-usuario', nombre, ( resp: any ) => {  // Envía el nombre como string
      this.emitir ('configurar-usuario', { nombre }, ( resp: any ) => { // Envía el nombre como objeto
        // Cuando se dispara la respuesta -resp- del servidor, quiere decir que el socket lo recibió y
        // lo configuró, pero dependiendo de lo que se responda el servidor, que igual puede ser falso, 
        // podemos mandar un error. Si bien se asume que la respuesta es verdadera, esta estructura
        // permite manejar ambos casos.
        // Habría que crear la estructura de resp del lado del servidor
        console.log('resp:', resp);
        if ( resp.ok ) { // true
              // En el video, pero esta inicialización se hizo en el constructor
              this.usuario = new UsuarioModel ( nombre );
              // this.usuario.nombre = nombre;
              this.storageSave();
              this.userList = resp.lst;
              console.log('Server says: ', resp.msg );
              console.log('I am:', nombre);
            resolve ( () => { // Investigar cuándo se usa así
            });
        } else {    // false
            console.log('Server says: ', resp);
            console.log("Can't initiate server session for: ", nombre );
            reject ( () => {
            });
        }
      });
    });
  }

  public usuarioGet() {
    return this.usuario;
  }

  storageSave() {
    localStorage.setItem (USERkey, JSON.stringify (this.usuario) );
  }

  storageRead() {
    // Video version 6/7
    // if ( localStorage.getItem(USERkey)) {
    //     this.usuario = JSON.parse ( localStorage.getItem(USERkey) );    // Error pero en Video Ok
    //     this.usuario = JSON.parse ( localStorage.getItem(USERkey) || '');  // Funciona pero no Ok
    // }
    // Own Version for Angular 12 - Mayo 2021
    const userStored = localStorage.getItem( USERkey );
    if ( userStored ) {
      this.usuario = JSON.parse ( userStored );
      this.loginWebSocket ( this.usuario.nombre );
    }
    else {
      console.log('¡Usuario sin registrar!');
    }
  }

}
