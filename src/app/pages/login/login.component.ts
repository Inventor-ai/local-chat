import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // nombre: string = '';  // Self Line
  nombre = '';             // Video line
  constructor(
    private webSocketService : WebSocketService,
    // 41. Mantener el usuario a pesar de las reconexiones
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ingresar() {
    if (this.nombre.trim().length === 0) {
        console.log('¡El nombre no puede estar vacío!');
        // Habría que devolver el mensaje de error
        return;
    }
    console.log('Login - Ingresar', this.nombre );
    this.webSocketService.loginWebSocket ( this.nombre )
    // 41. Mantener el usuario a pesar de las reconexiones
    // En respuesta a esta promesa, que no devuelve nada, pero puede retornar lo que sea
        .then ( ()=> { // Si resolve
          this.router.navigateByUrl('/mensajes');
          // this.router.navigateByUrl(`/mensajes/${this.nombre}`);
        })
        .catch( ()=> { // Si reject
          // 
        });
    
  }
}
