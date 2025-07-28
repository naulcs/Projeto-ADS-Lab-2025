import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TableModule, DialogModule, ButtonModule, InputTextModule, ConfirmDialogModule ],
  templateUrl: './clientes-list.html',
  providers: [ConfirmationService]
})
export class ClientesListComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  displayDialog: boolean = false;
  clienteSelecionado: Cliente | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void { this.carregarClientes(); }
  carregarClientes(): void { this.apiService.getClientes().subscribe(dados => this.clientes = dados); }

  abrirDialogNovoCliente() {
    this.clienteSelecionado = null;
    this.clienteForm.reset();
    this.clienteForm.get('cpf')?.enable();
    this.displayDialog = true;
  }

  abrirDialogEditarCliente(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    this.clienteForm.patchValue(cliente);
    this.clienteForm.get('cpf')?.disable();
    this.displayDialog = true;
  }

  salvarCliente() {
    if (this.clienteForm.invalid) { return; }

    if (this.clienteSelecionado) {
      this.apiService.updateCliente(this.clienteSelecionado.id, this.clienteForm.value).subscribe({
        next: (clienteAtualizado) => {
          const index = this.clientes.findIndex(c => c.id === clienteAtualizado.id);
          this.clientes[index] = clienteAtualizado;
          this.displayDialog = false;
        },
        error: (err: any) => alert('Erro ao atualizar cliente: ' + err.error.error)
      });
    } else {
      this.apiService.createCliente(this.clienteForm.value).subscribe({
        next: (novoCliente) => {
          this.clientes = [...this.clientes, novoCliente];
          this.displayDialog = false;
        },
        error: (err: any) => alert('Erro ao criar cliente: ' + err.error.error)
      });
    }
  }

  excluirCliente(cliente: Cliente) {
    this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir o cliente "${cliente.nome}"?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.apiService.deleteCliente(cliente.id).subscribe({
                next: () => {
                    this.clientes = this.clientes.filter(c => c.id !== cliente.id);
                },
                error: (err: any) => alert('Erro ao excluir cliente: ' + err.error.error)
            });
        }
    });
  }
}
