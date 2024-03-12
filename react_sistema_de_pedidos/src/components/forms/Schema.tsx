import { z } from "zod";

export const schema = z.object({
  status: z.string({
    required_error: "Selecione uma opção de status",
  }),
  leadOrigem: z
    .string({
      required_error: "Preencha o campo de 'Origem do Lead'",
    })
    .min(1, { message: "Preencha o campo de 'Origem do Lead'" }),
  leadData: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Selecione uma data válida"
            : defaultError,
      }),
    })
    .nullable()
    .optional(),
  cargoCliente: z
    .string({
      required_error: "Selecione uma opção de cargo",
    })
    .min(1, { message: "Selecione uma opção de cargo" }),
  empresa: z
    .string({
      required_error: "Preencha o campo de 'Empresa'",
    })
    .min(3, "'Empresa' precisa conter pelo menos 3 letras"),
  cnpj: z.string().refine(
    (value) => {
      const number = value.replace(/\D/g, "");
      return number.length == 14;
    },
    { message: "O  CNPJ precisa conter 14 números" }
  ),
  nomeCliente: z
    .string({
      required_error: "Preencha o campo de 'Nome'",
    })
    .min(3, "'Nome' precisa conter pelo menos 3 letras"),
  cpfCliente: z.string().refine(
    (value) => {
      const number = value.replace(/\D/g, "");
      return number.length == 11;
    },
    { message: "O CPF precisa conter 11 números" }
  ),
  email: z
    .string({
      required_error: "Preencha o campo de 'Email'",
    })
    .email("Email inválido"),
  telefone1: z.string().refine(
    (value) => {
      const number = value.replace(/\D/g, "");
      return number.length >= 10;
    },
    { message: "O Telefone precisa conter 10 ou 11 números" }
  ),
  telefone2: z
    .string({
      required_error: "Preencha o campo de 'Telefone 2'",
    })
    .nullable()
    .optional(),
  emailLogin: z.string({}).nullable().optional(),
  cep: z.string().refine(
    (value) => {
      const number = value.replace(/\D/g, "");
      return number.length == 8;
    },
    { message: "O CEP precisa conter 8 números" }
  ),
  logradouro: z
    .string({
      required_error: "Preencha o campo de 'Logradouro'",
    })
    .min(3, {
      message: "'Logradouro' precisa conter pelo menos 3 letras",
    }),
  numeroEndereco: z.string().refine(
    (value) => {
      const number = value.replace(/\D/g, "");
      const isValid = number;
      const isSN = value.toUpperCase() === "S/N";
      return isValid || isSN;
    },
    { message: "Preencha apenas números ou com 'S/N'" }
  ),
  complemento: z
    .string({
      required_error: "Preencha o campo de 'Complemento'",
    })
    .nullable()
    .optional(),
  bairro: z
    .string({
      required_error: "Preencha o campo de 'Bairro'",
    })
    .min(3, {
      message: "'Bairro' precisa conter pelo menos 3 letras",
    }),
  cidade: z
    .string({
      required_error: "Preencha o campo de 'Cidade'",
    })
    .min(3, {
      message: "'Cidade' precisa conter pelo menos 3 letras",
    }),
  estado: z
    .string({
      required_error: "Preencha o campo de 'Estado'",
    })
    .min(2, {
      message: "Selecione uma opção de UF",
    }),
  fretePreco: z.string({}).nullable().optional(),
  transportadora: z.string({}).nullable().optional(),
  arquivos: z.any({}).nullable().optional(),
  observacoes: z.string({}).nullable().optional(),
  consultor: z.string({}),
  planilhaVendas: z.boolean().nullable().default(false).optional(),
  licencaGerada: z.coerce.boolean().nullable().default(false).optional(),
  assinatura: z.coerce.boolean().nullable().default(false).optional(),
  chat: z.coerce.boolean().nullable().default(false).optional(),
  posVenda: z.coerce.boolean().nullable().default(false).optional(),
  notaFiscal: z.string({}).nullable().optional(),
  unidadeNegocio: z.string({}).nullable().optional(),
  previsaoEntrega: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Selecione uma data válida"
            : defaultError,
      }),
    })
    .nullable()
    .optional(),
  numeroSerie: z.string({}).nullable().optional(),
  codigoRastreio: z.string({}).nullable().optional(),
});
