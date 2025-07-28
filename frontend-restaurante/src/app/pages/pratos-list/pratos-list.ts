import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from '../../services/api';
import { Prato } from '../../models/prato.model';

@Component({
  selector: 'app-pratos-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, ConfirmDialogModule ],
  templateUrl: './pratos-list.html',
  providers: [ConfirmationService]
})
export class PratosListComponent implements OnInit {
  pratos: Prato[] = [];
  pratoForm: FormGroup;
  displayDialog: boolean = false;
  pratoSelecionado: Prato | null = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.pratoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void { this.carregarPratos(); }
  carregarPratos(): void { this.apiService.getPratos().subscribe(dados => this.pratos = dados); }

  abrirDialogNovoPrato() {
    this.pratoSelecionado = null;
    this.pratoForm.reset();
    this.displayDialog = true;
  }

  abrirDialogEditarPrato(prato: Prato) {
    this.pratoSelecionado = prato;
    this.pratoForm.patchValue(prato);
    this.displayDialog = true;
  }

  salvarPrato() {
    if (this.pratoForm.invalid) { return; }

    if (this.pratoSelecionado) {
      this.apiService.updatePrato(this.pratoSelecionado.id, this.pratoForm.value).subscribe({
        next: (pratoAtualizado) => {
          const index = this.pratos.findIndex(p => p.id === pratoAtualizado.id);
          this.pratos[index] = pratoAtualizado;
          this.displayDialog = false;
        },
        error: (err: any) => alert('Erro ao atualizar prato: ' + err.error.error)
      });
    } else {
      this.apiService.createPrato(this.pratoForm.value).subscribe({
        next: (novoPrato) => {
          this.pratos = [...this.pratos, novoPrato];
          this.displayDialog = false;
        },
        error: (err: any) => alert('Erro ao criar prato: ' + err.error.error)
      });
    }
  }

  excluirPrato(prato: Prato) {
    this.confirmationService.confirm({
        message: `Tem certeza que deseja excluir o prato "${prato.nome}"?`,
        header: 'Confirmação de Exclusão',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.apiService.deletePrato(prato.id).subscribe({
                next: () => {
                    this.pratos = this.pratos.filter(p => p.id !== prato.id);
                },
                error: (err: any) => alert('Erro ao excluir prato: ' + err.error.error)
            });
        }
    });
  }
}
