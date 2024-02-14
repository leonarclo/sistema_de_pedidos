import { z } from "zod";

export const schemaItem = z.object({
  categoria: z
    .string({
      required_error: "Selecione uma opção de categoria",
    })
    .refine((value) => value === "Venda" || value === "Contrato", {
      message: "Categoria inválida",
    }),
  produto: z.string({
    required_error: "Selecione uma opção de produto",
  }),
  preco: z
    .string({
      required_error: "Preencha o campo de 'Preço Unitário'",
    })
    .min(4, "O valor precisa conter pelo menos 3 números"),
  quantidade: z.string({
    required_error: "Preencha o campo de 'Quantidade'",
  }),
  precoTotal: z.string({}),
  software: z.string({}).optional(),
  valorMensal: z.string({}).optional(),
  formaPagamento: z.string({
    required_error: "Preencha o campo de 'Forma de Pagamento'",
  }),
  vencimento1Boleto: z.coerce.date({
    required_error: "Preencha o campo de 'Vencimento do 1 Boleto'",
  }),
  tipoPagamento: z.string({
    required_error: "Preencha o campo de 'Pagamento'",
  }),
  duracaoContrato: z
    .string({
      required_error: "Preencha o campo de 'Pagamento'",
    })
    .optional(),
  vigenciaInicio: z.coerce
    .date({
      required_error: "Preencha o campo de 'Vencimento do 1 Boleto'",
    })
    .optional(),
  vigenciaFim: z.coerce
    .date({
      required_error: "Preencha o campo de 'Vencimento do 1 Boleto'",
    })
    .optional(),
});
