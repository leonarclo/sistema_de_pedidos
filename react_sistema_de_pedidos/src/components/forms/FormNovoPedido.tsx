/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import InputsDetalhes from "./InputsDetalhes";
import InputsCliente from "./InputsCliente";
import { schema } from "./Schema";
import InputsEndereco from "./InputsEndereco";
import InputsItem from "./InputsItem";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { IItemPedidoRequest, IPedido } from "@/types";
import { schemaItem } from "./SchemaItem";
import InputArquivo from "./InputArquivo";
import TextareaObservacao from "./TextareaObservacao";
import {
  useLazyInserirItemPedidoQuery,
  useLazyInserirPedidoQuery,
} from "@/redux/api/pedidoApi";
import InputsHidden from "./InputsHidden";
import { format } from "date-fns";

function FormNovoPedido() {
  const [triggerInserirPedido] = useLazyInserirPedidoQuery();
  const [triggerInserirItem] = useLazyInserirItemPedidoQuery();

  const fullSchema = z.object({
    ...schema.shape,
    itens: z.array(schemaItem),
  });

  const form = useForm<z.infer<typeof fullSchema>>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      chave: format(new Date(), "yyMMddHHmmss"),
      consultor: "Leonardo",
      data: new Date(Date.now()),
    },
  });

  function onSubmit(values: z.infer<typeof fullSchema>) {
    const pedido = {
      chave: values.chave,
      data: values.data,
      consultor: values.consultor,
      empresa: values.empresa,
      cargoCliente: values.cargoCliente,
      leadOrigem: values.leadOrigem,
      leadData: values.leadData,
      cnpj: values.cnpj,
      email: values.email,
      status: values.status,
      telefone1: values.telefone1,
      telefone2: values.telefone2,
      logradouro: values.logradouro,
      numeroEndereco: values.numeroEndereco,
      bairro: values.bairro,
      complemento: values.complemento,
      cep: values.cep,
      cidade: values.cidade,
      estado: values.estado,
      transportadora: values.transportadora,
      fretePreco: values.fretePreco,
      nomeCliente: values.nomeCliente,
      cpfCliente: values.cpfCliente,
      observacoes: values.observacoes,
      emailLogin: values.emailLogin,
    };
    const itens: IItemPedidoRequest[] = [];
    values.itens.forEach((item) => {
      const itemPedido = {
        chave: values.chave,
        categoria: item.categoria,
        produto: item.produto,
        preco: item.preco,
        quantidade: item.quantidade,
        precoTotal: item.precoTotal,
        numeroFuncionarios: values.numeroEndereco,
        valorMensal: item.valorMensal,
        formaPagamento: item.formaPagamento,
        vencimento1Boleto: item.vencimento1Boleto,
        tipoPagamento: item.tipoPagamento,
        duracaoContrato: item.duracaoContrato,
        vigenciaInicio: item.vigenciaInicio,
        vigenciaFim: item.vigenciaFim,
      };

      itens.push(itemPedido);
    });
    console.log(values);
    triggerInserirPedido(pedido);
    triggerInserirItem(itens);
  }

  const editar = useAppSelector(
    (state) => state.editarPedidoState.editarPedido
  );
  const itens = useAppSelector((state) => state.itensPedidoState.itens);

  useEffect(() => {
    if (editar) {
      Object.keys(editar).forEach((key: any) =>
        form.setValue(key, editar[key as keyof IPedido])
      );
      form.setValue("observacoes", "");
    }
  }, [editar, itens, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="min-w-[80vw] h-[80vh] rounded-md border p-4 overflow-y-scroll">
          <div className="flex flex-wrap flex-col gap-6 py-2">
            <InputsHidden />
            <div className="flex gap-6 justify-start items-center">
              <InputsDetalhes />
            </div>
            <hr />
            <div className="flex flex-wrap gap-6 justify-start items-center">
              <InputsCliente />
            </div>
            <hr />
            <div className="flex flex-wrap gap-6 justify-start items-center">
              <InputsEndereco />
            </div>
            <hr />
            <div className="flex flex-wrap gap-6 justify-start items-center">
              <InputsItem />
            </div>
            <hr />
            <h4>Adicionar arquivo(s):</h4>
            <div className="flex flex-wrap justify-start items-center">
              <InputArquivo />
            </div>
            <div className="flex flex-col flex-wrap justify-center items-start w-[50%]">
              {editar && (
                <div className="mb-4">
                  <p>{editar.observacoes}</p>
                </div>
              )}
              <TextareaObservacao />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold flex items-center gap-2"
          >
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormNovoPedido;
