export interface IPedido {
  id: number;
  chave: string;
  data: string;
  consultor: string;
  empresa: string;
  cargoCliente: string;
  leadOrigem: string;
  leadData: string;
  cnpj: string;
  email: string;
  status: string;
  telefone1: string;
  telefone2?: string;
  logradouro: string;
  numeroEndereco: string;
  bairro: string;
  complemento?: string;
  cep: string;
  cidade: string;
  estado: string;
  transportadora?: string;
  fretePreco?: string;
  nomeCliente: string;
  cpfCliente: string;
  categoriaGrupo: string;
  observacoes?: string;
  emailLogin?: string;
}

export interface IItemPedido {
  id: number;
  chave: string;
  categoria: string;
  produto: string;
  preco: string;
  quantidade: string;
  precoTotal: string;
  numeroFuncionarios: string;
  valorMensal: string;
  formaPagamento: string;
  vencimento1Boleto: string;
  tipoPagamento: string;
  duracaoContrato?: string;
  vigenciaInicio?: string;
  vigenciaFim?: string;
  editadoPor?: string;
  editadoEm?: string;
}

export interface IArquivo {
  id: number;
  chave: string;
  arquivo: string;
}

export interface IPedidoRequest {
  consultor: string;
  empresa: string;
  cargoCliente: string;
  leadOrigem: string;
  leadData: string;
  cnpj: string;
  email: string;
  status: string;
  telefone1: string;
  telefone2?: string;
  logradouro: string;
  numeroEndereco: string;
  bairro: string;
  complemento?: string;
  cep: string;
  cidade: string;
  estado: string;
  transportadora?: string;
  fretePreco?: string;
  nomeCliente: string;
  cpfCliente: string;
  categoriaGrupo?: string;
  observacoes?: string;
  emailLogin?: string;
  editadoPor?: string;
  editadoEm?: string;
}

export interface IItemPedidoRequest {
  chave?: string;
  categoria: string;
  produto: string;
  preco: string;
  quantidade: string;
  precoTotal?: string;
  valorMensal?: string;
  formaPagamento: string;
  vencimento1Boleto: string;
  tipoPagamento: string;
  duracaoContrato?: string;
  vigenciaInicio?: string;
  vigenciaFim?: string;
  editadoPor?: string;
  editadoEm?: string;
}

export interface IPedidoCompleto {
  chave?: string;
  consultor: string;
  empresa: string;
  cargoCliente: string;
  leadOrigem: string;
  leadData: string;
  cnpj: string;
  email: string;
  status: string;
  telefone1: string;
  telefone2?: string;
  logradouro: string;
  numeroEndereco: string;
  bairro: string;
  complemento?: string;
  cep: string;
  cidade: string;
  estado: string;
  transportadora?: string;
  fretePreco?: string;
  nomeCliente: string;
  cpfCliente: string;
  categoriaGrupo?: string;
  observacoes?: string;
  emailLogin?: string;
  editadoPor?: string;
  editadoEm?: string;
  itens: IItemPedidoRequest[];
}
