import { z } from "zod";

export const schemaItem1 = z.object({
  produto: z
    .string({
      required_error: "Selecione uma opção",
    })
    .min(1, { message: "Selecione uma opção" }),
  preco: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(4, "O valor precisa conter pelo menos 3 números"),
  quantidade: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(1, { message: "Preencha este campo" }),
  precoTotal: z.string({}).nullable().optional(),
  formaPagamento: z
    .string({
      required_error: "Preencha este campo",
    })
    .min(1, "Preencha este campo"),
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
      required_error: "Preencha este campo",
    })
    .min(1, "Preencha este campo"),
});

export const schemaItem2 = z
  .object({
    categoria: z
      .string({
        required_error: "Selecione uma opção",
      })
      .refine((value) => value === "Venda" || value === "Contrato", {
        message: "Categoria inválida",
      }),
    valorMensal: z.string().nullable().optional(),
    duracaoContrato: z.string().nullable().optional(),
    vigenciaInicio: z.string().nullable().optional(),
    vigenciaFim: z.string().nullable().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.categoria === "Contrato" &&
      (data.valorMensal === "" ||
        data.valorMensal === null ||
        data.valorMensal === undefined)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Preencha este campo",
        path: ["valorMensal"],
      });
    } else if (data.valorMensal && data.valorMensal?.length < 4) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "O valor precisa conter pelo menos 3 números",
        path: ["valorMensal"],
      });
    }
    if (
      data.categoria === "Contrato" &&
      (data.duracaoContrato === "" ||
        data.duracaoContrato === null ||
        data.duracaoContrato === undefined)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione uma opção",
        path: ["duracaoContrato"],
      });
    }
    if (
      data.categoria === "Contrato" &&
      (data.vigenciaInicio === "" ||
        data.vigenciaInicio === null ||
        data.vigenciaInicio === undefined)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione uma data válida",
        path: ["vigenciaInicio"],
      });
    }
    if (
      data.categoria === "Contrato" &&
      (data.vigenciaFim === "" ||
        data.vigenciaFim === null ||
        data.vigenciaFim === undefined)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selecione uma data válida",
        path: ["vigenciaFim"],
      });
    }
  });

export const schemaItem = z.intersection(schemaItem1, schemaItem2);
