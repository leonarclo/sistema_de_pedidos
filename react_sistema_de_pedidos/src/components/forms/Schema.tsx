import { z } from "zod";

export const schema = z.object({
  status: z.string({
    required_error: "Selecione uma opção",
  }),
  leadOrigem: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(1, { message: "Preencha este campo" }),
  leadData: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Selecione uma data válida"
            : defaultError,
      }),
    })
    .nullable(),
  cargoCliente: z
    .string({
      required_error: "Selecione uma opção",
    })
    .min(1, { message: "Selecione uma opção" }),
  empresa: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(3, "Este campo precisa conter pelo menos 3 letras"),
  cnpj: z
    .string({
      required_error: "Preencha este campo",
    })
    .refine(
      (value) => {
        const number = value.replace(/\D/g, "");
        return number.length == 14;
      },
      { message: "Este campo precisa conter 14 números" }
    ),
  nomeCliente: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(3, "Este campo precisa conter pelo menos 3 letras"),
  cpfCliente: z
    .string({
      required_error: "Preencha este campo",
    })
    .refine(
      (value) => {
        const number = value.replace(/\D/g, "");
        return number.length == 11;
      },
      { message: "Este campo precisa conter 11 números" }
    ),
  email: z
    .string({
      required_error: "Preencha este campo",
    })
    .email("Email inválido"),
  telefone1: z
    .string({
      required_error: "Preencha este campo",
    })
    .refine(
      (value) => {
        const number = value.replace(/\D/g, "");
        return number.length >= 10;
      },
      { message: "Este campo precisa conter 10 ou 11 números" }
    ),
  telefone2: z.string().nullable().optional(),
  emailLogin: z.string().nullable().optional(),
  cep: z
    .string({
      required_error: "Preencha este campo",
    })
    .refine(
      (value) => {
        const number = value.replace(/\D/g, "");
        return number.length == 8;
      },
      { message: "Este campo precisa conter 8 números" }
    ),
  logradouro: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(3, {
      message: "Este campo precisa conter pelo menos 3 letras",
    }),
  numeroEndereco: z
    .string({
      required_error: "Preencha este campo",
    })
    .refine(
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
      required_error: "Preencha este campo",
    })
    .nullable()
    .optional(),
  bairro: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(3, {
      message: "Este campo precisa conter pelo menos 3 letras",
    }),
  cidade: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(3, {
      message: "Este campo precisa conter pelo menos 3 letras",
    }),
  estado: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(2, {
      message: "Selecione uma opção",
    }),
  fretePreco: z.string().nullable().optional(),
  transportadora: z.string().nullable().optional(),
  arquivos: z.any().nullable().optional(),
  observacoes: z.string().nullable().optional(),
  consultor: z.string(),
  planilhaVendas: z.boolean().nullable().default(false).optional(),
  licencaGerada: z.coerce.boolean().nullable().default(false).optional(),
  assinatura: z.coerce.boolean().nullable().default(false).optional(),
  chat: z.coerce.boolean().nullable().default(false).optional(),
  posVenda: z.coerce.boolean().nullable().default(false).optional(),
  notaFiscal: z.string().nullable().optional(),
  unidadeNegocio: z.string().nullable().optional(),
  previsaoEntrega: z.coerce.string().nullable().optional(),
  numeroSerie: z.string().nullable().optional(),
  codigoRastreio: z.string().nullable().optional(),
});
