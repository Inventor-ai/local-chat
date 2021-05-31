import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';  // 55. Logout - Cierre de sesión

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor( public webSocketService: WebSocketService,
               private router: Router ) {} // 55. Logout - Cierre de sesión (Own)  

  ngOnInit(): void {
    if (!this.webSocketService.storageRead()) {
        this.loginPage();
    }
  }

  salir() {
    console.log('Saliendo del chat...');
    // this.webSocketService.webSocketLogOut();  // Video aproximation
    this.webSocketService.webSocketLogOut()
        .then ( ()=> { this.loginPage(); });
  }
  
  private loginPage() {
    this.router.navigateByUrl ('/');
  }
}

// El código se simplifica mucho si la variable: this.webSocketService.usuario;
// se hace pública desde el webSocketService e incorpora directamente en el html

// En lugar de usar el método de sólo lectura: this.webSocketService.usuarioGet();
// Porque es necesario esperar aprox. 350ms a que terminen sus procesos internos 
// para que se generen las variables y valores que devuelve.
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
