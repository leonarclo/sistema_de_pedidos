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
  telefone2?: string | null;
  logradouro: string;
  numeroEndereco: string;
  bairro: string;
  complemento?: string | null;
  cep: string;
  cidade: string;
  estado: string;
  transportadora?: string | null;
  fretePreco?: string | null;
  nomeCliente: string;
  cpfCliente: string;
  categoriaGrupo: string;
  observacoes?: string | null;
  emailLogin?: string | null;
  planilhaVendas?: string | null;
  licencaGerada?: number | null;
  assinatura?: number | null;
  chat?: number | null;
  posVenda?: number | null;
  notaFiscal?: string | null;
  unidadeNegocio?: string | null;
  previsaoEntrega?: string | null;
  numeroSerie?: string | null;
  codigoRastreio?: string | null;
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
  duracaoContrato?: string | null;
  vigenciaInicio?: string | null;
  vigenciaFim?: string | null;
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
  precoTotal?: string | null;
  numeroFuncionarios?: string | null;
  valorMensal?: string | null;
  formaPagamento: string;
  vencimento1Boleto: string;
  tipoPagamento: string;
  duracaoContrato?: string | null;
  vigenciaInicio?: string | null;
  vigenciaFim?: string | null;
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
  telefone2?: string | null;
  logradouro: string;
  numeroEndereco: string;
  bairro: string;
  complemento?: string | null;
  cep: string;
  cidade: string;
  estado: string;
  transportadora?: string | null;
  fretePreco?: string | null;
  nomeCliente: string;
  cpfCliente: string;
  categoriaGrupo?: string | null;
  observacoes?: string | null;
  emailLogin?: string | null | null;
  planilhaVendas?: string | null;
  licencaGerada?: number | null;
  assinatura?: number | null;
  chat?: number | null;
  posVenda?: number | null;
  notaFiscal?: string | null;
  unidadeNegocio?: string | null;
  previsaoEntrega?: string | null;
  numeroSerie?: string | null;
  codigoRastreio?: string | null;
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
}

export interface IUsuarioRequest {
  usuario: string;
  password?: string | null;
  nomeCompleto: string;
  departamento: string;
  email: string;
  nivel: number;
}

export interface IProduto {
  id: number;
  produto: string;
  categoria: number;
}

export interface IProdutoRequest {
  produto: string;
  categoria: number;
}

export interface ILogin {
  usuario: string;
  password: string;
}

export interface ITokenPayload {
  departamento: string;
  email: string;
  exp: number;
  id: number;
  iss: string;
  nivel: number;
  nomeCompleto: string;
  sub: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IQueryPedido {
  consultor?: string;
  consultorId?: number;
  cnpj?: string;
}
