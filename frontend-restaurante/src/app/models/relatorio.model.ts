
export interface PratoPopular {
  id: number;
  nome: string;
  quantidade_pedidos: number;
}

export interface ClienteMaisPedidos {
  nome: string;
  total_pedidos: number;
}

export interface ClienteMaiorGasto {
  nome: string;
  total_gasto: number;
}