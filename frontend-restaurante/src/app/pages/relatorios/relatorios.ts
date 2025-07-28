import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ApiService } from '../../services/api';
import { PratoPopular, ClienteMaisPedidos, ClienteMaiorGasto } from '../../models/relatorio.model';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [ CommonModule, TableModule, CardModule ],
  templateUrl: './relatorios.html',
})
export class RelatoriosComponent implements OnInit {
  pratosPopulares: PratoPopular[] = [];
  clientesMaisPedidos: ClienteMaisPedidos[] = [];
  clientesMaiorGasto: ClienteMaiorGasto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    forkJoin({
      pratos: this.apiService.getPratosPopulares(),
      clientesPedidos: this.apiService.getClientesMaisPedidos(),
      clientesGasto: this.apiService.getClientesMaiorGasto()
    }).subscribe(({ pratos, clientesPedidos, clientesGasto }) => {
      this.pratosPopulares = pratos;
      this.clientesMaisPedidos = clientesPedidos;
      this.clientesMaiorGasto = clientesGasto;
    });
  }
}