import { Cliente } from './cliente.model';
import { Prato } from './prato.model';

export interface Pedido {
  id: number;
  valor_total: number;
  cliente: Cliente;
  pratos: Prato[];
  createdAt: string;
  updatedAt: string;
}

export interface PedidoCreate {
  cliente_id: number;
  prato_ids: number[];
}
