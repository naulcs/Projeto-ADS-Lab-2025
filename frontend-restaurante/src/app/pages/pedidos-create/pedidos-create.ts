import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Importações de componentes do PrimeNG (apenas o que é essencial)
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

// Nossos serviços e modelos
import { ApiService } from '../../services/api';
import { Cliente } from '../../models/cliente.model';
import { Prato } from '../../models/prato.model';

@Component({
  selector: 'app-pedidos-create',
  standalone: true,
  // A lista de imports agora é muito mais simples
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './pedidos-create.html',
  styleUrls: ['./pedidos-create.scss']
})
export class PedidosCreateComponent implements OnInit {

  clientes: Cliente[] = [];
  pratos: Prato[] = [];
  pedidoForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.pedidoForm = this.fb.group({
      cliente_id: [null, Validators.required],
      prato_ids: [[], [Validators.required, Validators.minLength(1)]] // Inicializa como array vazio
    });
  }

  ngOnInit(): void {
    this.apiService.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
    this.apiService.getPratos().subscribe(pratos => {
      this.pratos = pratos;
    });
  }

  salvarPedido(): void {
    if (this.pedidoForm.invalid) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.apiService.createPedido(this.pedidoForm.value).subscribe({
      next: () => {
        alert('Pedido criado com sucesso!');
        this.pedidoForm.reset();
        // Garante que o valor inicial do multiselect seja um array vazio após o reset
        this.pedidoForm.patchValue({prato_ids: []});
      },
      error: (err) => {
        alert('Falha ao criar o pedido. Verifique a consola para mais detalhes.');
        console.error('Erro ao criar pedido:', err);
      }
    });
  }
}
