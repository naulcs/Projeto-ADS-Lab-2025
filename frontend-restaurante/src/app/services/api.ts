import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prato } from '../models/prato.model';
import { Cliente } from '../models/cliente.model';
import { Pedido, PedidoCreate } from '../models/pedido.model';
import { PratoPopular, ClienteMaisPedidos, ClienteMaiorGasto } from '../models/relatorio.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPratos = (): Observable<Prato[]> => this.http.get<Prato[]>(`${this.apiUrl}/pratos`);
  createPrato = (data: Omit<Prato, 'id'|'createdAt'|'updatedAt'>): Observable<Prato> => this.http.post<Prato>(`${this.apiUrl}/pratos`, data);
  updatePrato = (id: number, data: Partial<Prato>): Observable<Prato> => this.http.put<Prato>(`${this.apiUrl}/pratos/${id}`, data);
  deletePrato = (id: number): Observable<void> => this.http.delete<void>(`${this.apiUrl}/pratos/${id}`);
  
  getClientes = (): Observable<Cliente[]> => this.http.get<Cliente[]>(`${this.apiUrl}/clientes`);
  createCliente = (data: Omit<Cliente, 'id'|'createdAt'|'updatedAt'>): Observable<Cliente> => this.http.post<Cliente>(`${this.apiUrl}/clientes`, data);
  updateCliente = (id: number, data: Partial<Cliente>): Observable<Cliente> => this.http.put<Cliente>(`${this.apiUrl}/clientes/${id}`, data);
  deleteCliente = (id: number): Observable<void> => this.http.delete<void>(`${this.apiUrl}/clientes/${id}`);

  getPedidos = (): Observable<Pedido[]> => this.http.get<Pedido[]>(`${this.apiUrl}/pedidos`);
  createPedido = (data: PedidoCreate): Observable<Pedido> => this.http.post<Pedido>(`${this.apiUrl}/pedidos`, data);

  getPratosPopulares = (): Observable<PratoPopular[]> => this.http.get<PratoPopular[]>(`${this.apiUrl}/relatorios/pratos-populares`);
  getClientesMaisPedidos = (): Observable<ClienteMaisPedidos[]> => this.http.get<ClienteMaisPedidos[]>(`${this.apiUrl}/relatorios/clientes-mais-pedidos`);
  getClientesMaiorGasto = (): Observable<ClienteMaiorGasto[]> => this.http.get<ClienteMaiorGasto[]>(`${this.apiUrl}/relatorios/clientes-maior-gasto`);
}
