import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApiService } from '../../services/api';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TableModule, DialogModule, ButtonModule, InputTextModule ],
  templateUrl: './clientes-list.html',
  styleUrls: ['./clientes-list.scss']
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  displayDialog: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void { this.carregarClientes(); }
  carregarClientes(): void { this.apiService.getClientes().subscribe(dados => this.clientes = dados); }
  abrirDialogNovoCliente() { this.clienteForm.reset(); this.displayDialog = true; }
  salvarCliente() {
    if (this.clienteForm.valid) {
      this.apiService.createCliente(this.clienteForm.value).subscribe({
        next: (novoCliente) => { this.clientes = [...this.clientes, novoCliente]; this.displayDialog = false; },
        error: (err) => { alert('Erro ao criar cliente: ' + err.error.error); }
      });
    }
  }
}