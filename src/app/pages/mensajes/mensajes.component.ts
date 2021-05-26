import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor( public webSocketService: WebSocketService ) { }

  ngOnInit(): void {}
}

/*
export class MensajesComponent implements OnInit {
  nombre: string = '';
  constructor( public webSocketService: WebSocketService ) { }

  ngOnInit(): void {
    setTimeout(() => { 
      this.nombre = this.webSocketService.usuarioGet().nombre;
    }, 350);
  }
}
*/

// El código se simplifica mucho si la variable: this.webSocketService.usuario;
// si hace pública desde el webSocketService e incorpora directamente en el html

// En lugar de usar el método de sólo lectura: this.webSocketService.usuarioGet();
// Porque es necesario esperar aprox. 350ms a que terminen sus procesos internos 
// para que se generen las variables y valores que devuelve.
