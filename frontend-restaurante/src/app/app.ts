import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ApiService } from './services/api'; 
import { Prato } from './models/prato.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  
  pratos: Prato[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.carregarPratos();
  }

  carregarPratos() {
    this.apiService.getPratos().subscribe((dadosRecebidos: Prato[]) => {
      console.log('Dados recebidos da API:', dadosRecebidos);
      this.pratos = dadosRecebidos;
    });
  }
}
