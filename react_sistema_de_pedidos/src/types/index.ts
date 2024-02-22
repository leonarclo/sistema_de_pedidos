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
  planilhaVendas?: string;
  licencaGerada?: number;
  assinatura?: number;
  chat?: number;
  posVenda?: number;
  notaFiscal?: string;
  unidadeNegocio?: string;
  previsaoEntrega?: string;
  numeroSerie?: string;
  codigoRastreio?: string;
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

export interface IArquivoRequest {
  arquivo: string;
}

export interface IItemPedidoRequest {
  categoria: string;
  produto: string;
  preco: string;
  quantidade: string;
  precoTotal?: string;
  numeroFuncionarios?: string;
  valorMensal?: string;
  formaPagamento: string;
  vencimento1Boleto: string;
  tipoPagamento: string;
  duracaoContrato?: string;
  vigenciaInicio?: string;
  vigenciaFim?: string;
}

export interface IPedidoCompleto {
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
  planilhaVendas?: string;
  licencaGerada?: number;
  assinatura?: number;
  chat?: number;
  posVenda?: number;
  notaFiscal?: string;
  unidadeNegocio?: string;
  previsaoEntrega?: string;
  numeroSerie?: string;
  codigoRastreio?: string;
  itens: IItemPedidoRequest[];
  arquivos?: string[];
}

export interface IUsuario {
  id: number;
  usuario: string;
  nomeCompleto: string;
  departamento: string;
  email: string;
  nivel: number;
  fator: number;
}

export interface IUsuarioRequest {
  usuario: string;
  senha: string;
  nomeCompleto: string;
  departamento: string;
  email: string;
  nivel: number;
  fator: number;
}
