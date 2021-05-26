import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  
  // elem: HTMLElement;
  elem: any;
  usrs: any[] = [];
  // lstS: Subscription = new Subscription();
  constructor( ) { 
  // constructor( private wSocketService: WebSocketService ) { 
    //  this.elem = new HTMLElement().DOCUMENT_NODE;
    this.usrs = [
      {'nombre': 'Uno'}, 
      {'nombre': 'Dos'}, 
      {'nombre': 'Tres'}
    ];
  }

  ngOnInit(): void {
    // this.elem = document.getElementById('chat-usuarios');
    // this.lstS = this.wSocketService.retriveUsersList()
    //                 .subscribe ( ( lista: any ) => {
    //                   console.log('lista usuarios', lista);
    //                    this.usrs = lista;
    //                 });
    // setTimeout ( ()=> {
    //    this.elem.scrollTop = this.elem.scrollHeight;
    // }, 50);
  }

  ngOnDestroy() {
    // this.lstS.unsubscribe();
  }

}
