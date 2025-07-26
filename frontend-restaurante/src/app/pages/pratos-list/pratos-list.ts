import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ApiService } from '../../services/api';
import { Prato } from '../../models/prato.model';

@Component({
  selector: 'app-pratos-list',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TableModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule, InputTextareaModule ],
  templateUrl: './pratos-list.html',
  styleUrls: ['./pratos-list.scss']
})
export class PratosListComponent implements OnInit {
  pratos: Prato[] = [];
  pratoForm: FormGroup;
  displayDialog: boolean = false;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.pratoForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void { this.carregarPratos(); }
  carregarPratos(): void { this.apiService.getPratos().subscribe(dados => this.pratos = dados); }
  abrirDialogNovoPrato() { this.pratoForm.reset(); this.displayDialog = true; }
  salvarPrato() {
    if (this.pratoForm.valid) {
      this.apiService.createPrato(this.pratoForm.value).subscribe({
        next: (novoPrato) => { this.pratos = [...this.pratos, novoPrato]; this.displayDialog = false; },
        error: (err) => console.error('Erro ao criar prato', err)
      });
    }
  }
}