import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  public texto = '';
  public mensajes: any[] = [];
  // Son lo mismo que si se declararan public
  // texto = '';
  // mensajes: any[] = [];
  // elemento: HTMLElement;          // Video. Marca un error (Subrayado en rojo)
  // elemento!: HTMLElement;         // Video. Provoca el error (2322)
  // -----------------------------------------------------------------------------
  // Type 'HTMLElement | null' is not assignable to type 'HTMLElement'.
  // Type 'null' is not assignable to type 'HTMLElement'.ts(2322)
  // -----------------------------------------------------------------------------
  // elemento: any;                 // Own Test and Works Ok
  private elemento: any;            // Own Test and Works Ok
  
  // msgsSuscribed: Subscription;   // Video. Marca un error
  msgsSuscribed!: Subscription;     // Video. Ya no marcar el error y funciona bien
  // msgsSuscribed: Subscription = Subscription.EMPTY; // Own Test and Works Ok

  constructor( public chatService: ChatService ) {}

  ngOnInit(): void {
    this.msgsSuscribed = this.chatService.receiveNessages()
        .subscribe( msg => {
           this.elemento = document.getElementById('chat-mensajes');
           this.mensajes.push( msg );
           setTimeout(() => { // Desplaza la lista de mensajes hasta abajo
              this.elemento.scrollTop = this.elemento.scrollHeight;
           }, 50);
          //  console.log(msg);
        });
  }

  ngOnDestroy(){
    this.msgsSuscribed.unsubscribe();
  }

  enviar() {
    if (this.texto.trim().length > 0) {
        this.chatService.sendMessage ( this.texto );    
    }
    this.texto = '';
  }

}
