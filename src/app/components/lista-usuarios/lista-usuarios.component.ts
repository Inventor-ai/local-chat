import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})

export class ListaUsuariosComponent implements OnInit {

  // 53. Componente de Lista de Usuarios
  // En lugar de <any>, debería ser de tipo Usuario
  // usuariosActivosObs: Observable<any>;  // Produce error de inicialización de la variable (Angular 12)
  usuariosActivosObs!: Observable<any>;    // Own: Fix no constructor initialization error

  constructor( public chatService: ChatService ) { 
    this.usuariosActivosObs = this.chatService.clientesActivosGet();
  }

  ngOnInit(): void {
    // Own: 
    // this.usuariosActivosObs = this.chatService.clientesActivosGet(); // Video

    // 54. Tarea - Obtener lista de usuarios - socket
    this.chatService.clientesOnChatGet();
  }

}
