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

export interface IStatus {
  status:
    | "Cancelada"
    | "Nota Fiscal"
    | "Contrato"
    | "Aberta"
    | "Aguardando Aceite"
    | "Aguardando Pagamento"
    | "Teste 7 Dias"
    | "Finalizado"
    | "Atrelado"
    | "Enviado"
    | "Omie Contrato"
    | "Lançado OMIE"
    | "Emitir NFSe"
    | "Em Producao"
    | "Recusado"
    | "Edicao"
    | "Bonificacao"
    | "Liberado Financeiro"
    | "Troca";
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
}

export interface IArquivo {
  id: number;
  chave: string;
  arquivo: string;
}

export interface IPedidoRequest {
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
  categoriaGrupo?: string;
  observacoes?: string;
  emailLogin?: string;
}

export interface IPedidoUpdate {
  id: number;
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
}

export interface IItemPedidoRequest {
  chave: string;
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
}

export interface IItemPedidoUpdate {
  id: number;
  categoria: string;
  produto: string;
  preco: string;
  quantidade: string;
  precoTotal?: string;
  software?: string;
  valorMensal?: string;
  formaPagamento: string;
  vencimento1Boleto: string;
  tipoPagamento: string;
  duracaoContrato?: string;
  vigenciaInicio?: string;
  vigenciaFim?: string;
}
