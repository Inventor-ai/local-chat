import { Component, OnDestroy, OnInit } from '@angular/core';
// import { WebSocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'basico';
  msgPrivSubs!: Subscription;
  
  constructor ( // public wsService: WebSocketService, // ¿Qué hace esto?
                public chatService: ChatService ) {}

  ngOnInit (): void {
    this.msgPrivSubs = this.chatService.mensajePrivadoGet()
        .subscribe( ( msg ) => {
           console.log('Mensaje Privado: ', msg );
        });
  }

  ngOnDestroy(): void {
    this.msgPrivSubs.unsubscribe();
  }

}
