/* eslint-disable react-hooks/exhaustive-deps */
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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { IItemPedidoRequest, IPedido, IPedidoCompleto } from "@/types";
import { schemaItem } from "./SchemaItem";
import InputArquivo from "./InputArquivo";
import TextareaObservacao from "./TextareaObservacao";
import {
  useInserirPedidoMutation,
  useEditarPedidoMutation,
} from "@/redux/api/pedidoApi";
import InputsHidden from "./InputsHidden";
import { format } from "date-fns";
import InputsAdm from "./InputsAdm";
import { LoadingSpinner } from "../ui/loading-spinner";
import { Check } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { closeModal } from "@/redux/features/modalSlice";
import PreencherClientePedido from "../dialogs/PreencherClientePedido";
import { useUploadMutation } from "@/redux/api/filesApi";

function FormNovoPedido() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [
    triggerInserirPedido,
    { isLoading: inserindo, isSuccess: inserido, isError: erroInserir },
  ] = useInserirPedidoMutation();
  const [
    triggerEditarPedido,
    { isLoading: editando, isSuccess: editado, isError: erroEditar },
  ] = useEditarPedidoMutation();
  const usuario = useAppSelector((state) => state.getUserState.usuario);

  const [triggerUpload] = useUploadMutation();

  const fullSchema = z.object({
    ...schema.shape,
    itens: z.array(schemaItem),
  });

  const editar = useAppSelector(
    (state) => state.editarPedidoState.editarPedido
  );
  const editarItem = useAppSelector((state) => state.itensPedidoState.itens);
  const arquivos = useAppSelector((state) => state.arquivosState.arquivos);

  const form = useForm<z.infer<typeof fullSchema>>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      consultor: usuario?.sub,
      itens: [],
    },
    context: "pedido",
  });

  const errors = form.formState.errors;

  useEffect(() => {
    if (inserido || editado) {
      dispatch(closeModal("edit"));
      toast({
        variant: "success",
        description: "Sucesso!",
      });
    } else if (erroInserir || erroEditar) {
      toast({
        variant: "error",
        description: "Ops... tente novamente!",
      });
    }
  }, [inserido, editado, errors]);

  useEffect(() => {
    const firstErrorInput = Object.keys(errors).find((field) => {
      return document.getElementsByName(field).length > 0;
    });

    if (firstErrorInput) {
      const element = document.getElementsByName(firstErrorInput)[0];
      if (element) {
        element.focus();
      }
    } else {
      (
        document.querySelector("[name=leadOrigem]") as HTMLInputElement | null
      )?.focus();
    }
  }, [errors]);

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
      const name = usuario?.sub;
      const formattedName = name
        ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        : "";
      let observacoes;
      if (
        values.observacoes &&
        values.observacoes != "" &&
        editar.observacoes &&
        editar.observacoes != ""
      ) {
        observacoes = `${editar.observacoes} | ${formattedName}: ${values.observacoes}`;
      } else if (
        values.observacoes == "" ||
        (values.observacoes == null &&
          editar.observacoes != "" &&
          editar.observacoes != null)
      ) {
        observacoes = editar.observacoes;
      } else {
        observacoes = `${formattedName}: ${values.observacoes}`;
      }

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

      const fileNames = [];
      arquivos.forEach((arquivo) => {
        fileNames.push(arquivo);
      });
      if (values.arquivos) {
        for (let i = 0; i < values.arquivos.length; i++) {
          fileNames.push(values.arquivos[i].name);
        }
      }

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
        arquivos: fileNames,
      };
      triggerEditarPedido({
        body: editarPedido,
        usuarioId: usuario?.id,
        id: editar.id,
        itemId,
      });
      triggerUpload(form.getValues("arquivos"));
    } else {
      const name = usuario?.sub;
      const formattedName = name
        ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        : "";
      const observacoes =
        values.observacoes && values.observacoes != ""
          ? `${formattedName}: ${values.observacoes}`
          : "";
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

      const fileNames = [];
      if (values.arquivos) {
        for (let i = 0; i < values.arquivos.length; i++) {
          fileNames.push(values.arquivos[i].name);
        }
      }

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
        arquivos: fileNames,
      };
      console.log(pedidoCompleto);
      triggerInserirPedido({ body: pedidoCompleto, usuarioId: usuario?.id });
      triggerUpload(form.getValues("arquivos"));
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
            <PreencherClientePedido />
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
            <h4>Adicionar arquivo(s):</h4>
            <div className="flex flex-wrap justify-start items-center">
              <InputArquivo />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex-1">
                <div className="flex flex-col flex-wrap justify-center items-start">
                  {editar ? (
                    <div className="mb-4">
                      <p>{editar.observacoes}</p>
                    </div>
                  ) : null}
                </div>
                <TextareaObservacao />
              </div>
              {editar ? (
                <>
                  <hr />
                  <div className="flex flex-wrap gap-6 justify-start items-center">
                    <InputsAdm />
                  </div>
                  <hr />
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded font-bold flex items-center gap-2"
          >
            {inserindo || editando ? <LoadingSpinner /> : ""}
            {inserido || editado ? <Check /> : ""}
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormNovoPedido;
