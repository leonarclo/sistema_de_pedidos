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
import { IItemPedidoRequest, IPedido, IPedidoCompleto } from "@/types";
import { schemaItem } from "./SchemaItem";
import InputArquivo from "./InputArquivo";
import TextareaObservacao from "./TextareaObservacao";
import {
  useLazyEditarPedidoQuery,
  useLazyInserirPedidoQuery,
} from "@/redux/api/pedidoApi";
import InputsHidden from "./InputsHidden";
import { format } from "date-fns";
import InputsAdm from "./InputsAdm";

function FormNovoPedido() {
  const [triggerInserirPedido] = useLazyInserirPedidoQuery();
  const [triggerEditarPedido] = useLazyEditarPedidoQuery();
  const fullSchema = z.object({
    ...schema.shape,
    itens: z.array(schemaItem),
  });

  const editar = useAppSelector(
    (state) => state.editarPedidoState.editarPedido
  );
  const editarItem = useAppSelector((state) => state.itensPedidoState.itens);

  const form = useForm<z.infer<typeof fullSchema>>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      consultor: "Leonardo",
    },
  });

  function onSubmit(values: z.infer<typeof fullSchema>) {
    let categoriaGrupo;
    let venda = false;
    let contrato = false;
    values.itens.forEach((item) => {
      if (item.categoria == "Venda") {
        venda = true;
        categoriaGrupo = "Venda";
      }
      if (item.categoria == "Contrato") {
        contrato = true;
        categoriaGrupo = "Contrato";
      }
      if (venda == true && contrato == true) {
        categoriaGrupo = "Venda + Contrato";
      }
    });

    if (editar && editarItem) {
      const observacoes = editar.observacoes
        ? `${editar.observacoes} | ${values.consultor}: ${values.observacoes}`
        : `${values.consultor}: ${values.observacoes}`;
      let itemId;
      const editarItemPedido: IItemPedidoRequest[] = [];
      values.itens.forEach((item, index) => {
        itemId = editarItem[index].id;
        const funcionariosId = editarItem[index].numeroFuncionarios;
        const itemPedido: IItemPedidoRequest = {
          categoria: item.categoria,
          produto: item.produto,
          preco: item.preco,
          quantidade: item.quantidade,
          precoTotal: item.precoTotal,
          numeroFuncionarios: funcionariosId,
          valorMensal: item.valorMensal,
          formaPagamento: item.formaPagamento,
          vencimento1Boleto: format(item.vencimento1Boleto, "yyyy-MM-dd"),
          tipoPagamento: item.tipoPagamento,
          duracaoContrato: item.duracaoContrato,
          vigenciaInicio: item.vigenciaInicio
            ? format(item.vigenciaInicio, "yyyy-MM-dd")
            : undefined,
          vigenciaFim: item.vigenciaFim
            ? format(item.vigenciaFim, "yyyy-MM-dd")
            : undefined,
        };
        editarItemPedido.push(itemPedido);
      });
      const editarPedido: IPedidoCompleto = {
        consultor: values.consultor,
        empresa: values.empresa,
        cargoCliente: values.cargoCliente,
        leadOrigem: values.leadOrigem,
        leadData: format(values.leadData, "yyyy-MM-dd"),
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
        categoriaGrupo,
        observacoes: observacoes,
        planilhaVendas: values.planilhaVendas == true ? "1" : "0",
        licencaGerada: values.licencaGerada == true ? 1 : 0,
        assinatura: values.assinatura == true ? 1 : 0,
        chat: values.chat == true ? 1 : 0,
        posVenda: values.posVenda == true ? 1 : 0,
        notaFiscal: values.notaFiscal,
        unidadeNegocio: values.unidadeNegocio,
        previsaoEntrega: values.previsaoEntrega
          ? format(values.previsaoEntrega, "yyyy-MM-dd")
          : undefined,
        numeroSerie: values.numeroSerie,
        codigoRastreio: values.codigoRastreio,
        emailLogin: values.emailLogin,
        itens: editarItemPedido,
      };
      console.log(editarPedido);
      triggerEditarPedido({
        body: editarPedido,
        id: editar.id,
        itemId,
      });
    } else {
      const observacoes = `${values.consultor}: ${values.observacoes}`;
      const itens: IItemPedidoRequest[] = [];
      values.itens.forEach((item) => {
        const itemPedido = {
          categoria: item.categoria,
          produto: item.produto,
          preco: item.preco,
          quantidade: item.quantidade,
          precoTotal: item.precoTotal,
          valorMensal: item.valorMensal,
          formaPagamento: item.formaPagamento,
          vencimento1Boleto: format(item.vencimento1Boleto, "yyyy-MM-dd"),
          tipoPagamento: item.tipoPagamento,
          duracaoContrato: item.duracaoContrato,
          vigenciaInicio: item.vigenciaInicio
            ? format(item.vigenciaInicio, "yyyy-MM-dd")
            : undefined,
          vigenciaFim: item.vigenciaFim
            ? format(item.vigenciaFim, "yyyy-MM-dd")
            : undefined,
        };

        itens.push(itemPedido);
      });
      const pedidoCompleto: IPedidoCompleto = {
        consultor: values.consultor,
        empresa: values.empresa,
        cargoCliente: values.cargoCliente,
        leadOrigem: values.leadOrigem,
        leadData: format(values.leadData, "yyyy-MM-dd"),
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
        categoriaGrupo,
        observacoes: values.observacoes ? observacoes : undefined,
        planilhaVendas: values.planilhaVendas == true ? "1" : "0",
        licencaGerada: values.licencaGerada == true ? 1 : 0,
        assinatura: values.assinatura == true ? 1 : 0,
        chat: values.chat == true ? 1 : 0,
        posVenda: values.posVenda == true ? 1 : 0,
        notaFiscal: values.notaFiscal,
        unidadeNegocio: values.unidadeNegocio,
        previsaoEntrega: values.previsaoEntrega
          ? format(values.previsaoEntrega, "yyyy-MM-dd")
          : undefined,
        numeroSerie: values.numeroSerie,
        codigoRastreio: values.codigoRastreio,
        emailLogin: values.emailLogin,
        itens,
      };
      console.log(pedidoCompleto);
      triggerInserirPedido(pedidoCompleto);
    }
  }

  useEffect(() => {
    if (editar) {
      Object.keys(editar).forEach((key: any) =>
        form.setValue(key, editar[key as keyof IPedido])
      );
      form.setValue("observacoes", "");
      form.setValue(
        "planilhaVendas",
        editar.planilhaVendas == "1" ? true : false
      );
      form.setValue("licencaGerada", editar.licencaGerada == 1 ? true : false);
      form.setValue("assinatura", editar.assinatura == 1 ? true : false);
      form.setValue("chat", editar.chat == 1 ? true : false);
      form.setValue("posVenda", editar.posVenda == 1 ? true : false);
    }
  }, [editar, form]);

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
            <div className="flex flex-wrap gap-6 justify-start items-center">
              <InputsAdm />
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
