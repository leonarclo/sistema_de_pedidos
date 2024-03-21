import { z } from "zod";

export const schemaItem = z.object({
  categoria: z
    .string({
      required_error: "Selecione uma opção de categoria",
    })
    .refine((value) => value === "Venda" || value === "Contrato", {
      message: "Categoria inválida",
    }),
  produto: z
    .string({
      required_error: "Selecione uma opção de produto",
    })
    .min(1, { message: "Selecione uma opção de produto" }),
  preco: z
    .string({
      required_error: "Preencha o campo de 'Preço Unitário'",
    })
    .min(4, "O valor precisa conter pelo menos 3 números"),
  quantidade: z
    .string({
      required_error: "Preencha o campo de 'Quantidade'",
    })
    .min(1, { message: "Preencha o campo de 'Quantidade'" }),
  precoTotal: z.string({}).nullable().optional(),
  formaPagamento: z
    .string({
      required_error: "Preencha o campo de 'Forma de Pagamento'",
    })
    .min(1, "Preencha o campo de 'Forma de Pagamento'"),
  vencimento1Boleto: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_date"
          ? "Selecione uma data válida"
          : defaultError,
    }),
  }),
  tipoPagamento: z
    .string({
      required_error: "Preencha o campo de 'Pagamento'",
    })
    .min(1, "Preencha o campo de 'Tipo de Pagamento'"),
  valorMensal: z
    .string({})
    .min(4, "O valor precisa conter pelo menos 3 números")
    .nullable()
    .optional()
    .or(z.literal("")),
  duracaoContrato: z
    .string({
      required_error: "Preencha o campo de 'Pagamento'",
    })
    .nullable()
    .optional(),
  vigenciaInicio: z.coerce
    .string({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Selecione uma data válida"
            : defaultError,
      }),
    })
    .nullable()
    .optional()
    .or(z.literal("")),
  vigenciaFim: z.coerce
    .string({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date"
            ? "Selecione uma data válida"
            : defaultError,
      }),
    })
    .nullable()
    .optional()
    .or(z.literal("")),
});
