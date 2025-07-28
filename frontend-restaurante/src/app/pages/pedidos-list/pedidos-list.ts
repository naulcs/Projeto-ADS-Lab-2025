import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

import { ApiService } from '../../services/api';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-pedidos-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    CardModule
  ],
  templateUrl: './pedidos-list.html',
})
export class PedidosListComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.apiService.getPedidos().subscribe((dados: Pedido[]) => {
      this.pedidos = dados;
    });
  }
}
