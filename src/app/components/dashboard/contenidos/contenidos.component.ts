import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/usuario.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-contenidos',
  templateUrl: './contenidos.component.html',
  styleUrls: ['./contenidos.component.css']
})
export class ContenidosComponent implements OnInit {
    nombreUsuario: string;

  constructor(private accountService: AccountService) { 
    this.nombreUsuario = "";
  }

  ngOnInit(): void {
    this.getNombreUsuario();
  }

    getNombreUsuario(): void {
      this.nombreUsuario = this.accountService.getUserName();
    }
}
