import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prato } from '../models/prato.model';
import { Cliente } from '../models/cliente.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  getPratos = (): Observable<Prato[]> => this.http.get<Prato[]>(`${this.apiUrl}/pratos`);
  createPrato = (data: Omit<Prato, 'id'|'createdAt'|'updatedAt'>): Observable<Prato> => this.http.post<Prato>(`${this.apiUrl}/pratos`, data);
  getClientes = (): Observable<Cliente[]> => this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  createCliente = (data: Omit<Cliente, 'id'|'createdAt'|'updatedAt'>): Observable<Cliente> => this.http.post<Cliente>(`${this.apiUrl}/clientes`, data);
}