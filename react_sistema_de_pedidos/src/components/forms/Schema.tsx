import { z } from "zod";

export const schema = z.object({
  status: z.string({
    required_error: "Selecione uma opção de status",
  }),
  leadOrigem: z.string({
    required_error: "Preencha o campo de 'Origem do Lead'",
  }),
  leadData: z.coerce.string({
    required_error: "Preencha o campo de 'Data do Lead'",
  }),
  cargoCliente: z.string({
    required_error: "Selecione uma opção de cargo",
  }),
  empresa: z
    .string({
      required_error: "Preencha o campo de 'Empresa'",
    })
    .min(3, "'Empresa' precisa conter pelo menos 3 letras"),
  cnpj: z
    .string({
      required_error: "Preencha o campo de 'CNPJ'",
    })
    .min(10, "CNPJ inválido"),
  nomeCliente: z
    .string({
      required_error: "Preencha o campo de 'Nome'",
    })
    .min(3, "'Nome' precisa conter pelo menos 3 letras"),
  cpfCliente: z
    .string({
      required_error: "Preencha o campo de 'CPF'",
    })
    .min(14, "CPF inválido"),
  email: z
    .string({
      required_error: "Preencha o campo de 'Email'",
    })
    .email("Email inválido"),
  telefone1: z
    .string({
      required_error: "Preencha o campo de 'Telefone 1'",
    })
    .min(13, "Número de telefone inválido"),
  telefone2: z
    .string({
      required_error: "Preencha o campo de 'Telefone 2'",
    })
    .min(13, "Número de telefone inválido")
    .optional(),
  emailLogin: z.string({}).optional(),
  cep: z
    .string({ required_error: "Preencha o campo de 'CEP'" })
    .min(8, "'CEP' precisa conter pelo menos 9 letras"),
  logradouro: z
    .string({
      required_error: "Preencha o campo de 'Logradouro'",
    })
    .min(3, {
      message: "'Logradouro' precisa conter pelo menos 3 letras",
    }),
  numeroEndereco: z.string({
    required_error: "Preencha o campo de 'Número'",
  }),
  complemento: z
    .string({
      required_error: "Preencha o campo de 'Complemento'",
    })
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
    .max(2, {
      message: "'Estado (UF)' precisa conter 2 letras",
    }),
  fretePreco: z.string({}).optional(),
  transportadora: z.string({}).optional(),
  arquivos: z.any({}).optional(),
  observacoes: z.string({}).optional(),
  consultor: z.string({}),
  data: z.coerce.string({}),
  chave: z.string({}),
});
