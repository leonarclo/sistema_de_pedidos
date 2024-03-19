/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { History } from "lucide-react";
import {
  useLazyArquivoRevisionsQuery,
  useLazyItemRevisionsQuery,
  useLazyPedidoRevisionsQuery,
} from "@/redux/api/logApi";

import moment from "moment";

function RevisionDialog({ row }: any) {
  const [
    triggerPedidoRevisions,
    { data: pedidoRev, isSuccess: successPedido },
  ] = useLazyPedidoRevisionsQuery();
  const [triggerItemRevisions, { data: itemRev, isSuccess: successItem }] =
    useLazyItemRevisionsQuery();
  const [
    triggerArquivoRevisions,
    { data: arquivoRev, isSuccess: successArquivo },
  ] = useLazyArquivoRevisionsQuery();

  const handleClickRevisoesButton = async (e: any, row: any) => {
    e.stopPropagation();
    triggerPedidoRevisions(row);
    triggerItemRevisions(row);
    triggerArquivoRevisions(row);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => handleClickRevisoesButton(e, row)}
          variant={"link"}
          className="text-blue-600"
          style={{ cursor: "pointer" }}
        >
          Histórico de edições
          <History size={20} className="ms-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[75vw] max-w-[95vw] max-h-[90vh] overflow-y-scroll text-sm">
        <div className="p-2">
          <div className="flex flex-col gap-4 justify-between p-2">
            <h4 className="font-bold">Pedido:</h4>
            {successPedido && pedidoRev && pedidoRev.length > 0 ? (
              <div className="max-w-full overflow-x-auto">
                <table className="border-collapse border border-gray-400">
                  <colgroup>
                    <col className="max-w-[200px] overflow-x-auto flex-nowrap truncate" />
                    {Object.keys(pedidoRev[0][0]).map((_, index: number) => (
                      <col
                        key={index}
                        className="max-w-[200px] overflow-x-auto flex-nowrap truncate"
                      />
                    ))}
                    <col className="max-w-[200px] overflow-x-auto flex-nowrap truncate" />{" "}
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">acao</th>
                      {pedidoRev &&
                        pedidoRev.length > 0 &&
                        pedidoRev[0] &&
                        pedidoRev[0].length > 0 &&
                        Object.keys(pedidoRev[0][0]).map((key: string) => (
                          <th key={key} className="border border-gray-400 p-2">
                            {key}
                          </th>
                        ))}
                      <th className="border border-gray-400 p-2">editadoEm</th>{" "}
                    </tr>
                  </thead>
                  <tbody>
                    {pedidoRev?.map((pedido: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2 max-h-[50px] overflow-auto max-w-[500px] flex-nowrap truncate">
                          {pedido.includes("MOD")
                            ? "MOD"
                            : pedido.includes("ADD")
                            ? "ADD"
                            : pedido.includes("DEL")
                            ? "DEL"
                            : ""}
                        </td>
                        {pedido[0] &&
                          Object.values(pedido[0]).map(
                            (value: any, index: number) => (
                              <td
                                key={index}
                                className="border border-gray-400 p-2 max-h-[50px] overflow-auto max-w-[500px] flex-nowrap truncate"
                              >
                                {value}
                              </td>
                            )
                          )}
                        {pedido[1]?.revisionDate && (
                          <td className="border border-gray-400 p-2 max-h-[50px] overflow-auto max-w-[500px] flex-nowrap truncate">
                            {moment(pedido[1].revisionDate).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Nenhuma alteração encontrada!</p>
            )}
            <h4 className="font-bold">Itens:</h4>
            {successItem && itemRev && itemRev.length > 0 ? (
              <div className="max-w-full overflow-x-auto">
                <table className="border-collapse border border-gray-400">
                  <colgroup>
                    <col className="max-w-[200px] overflow-x-auto flex-nowrap truncate" />
                    {Object.keys(itemRev[0][0]).map((_, index: number) => (
                      <col
                        key={index}
                        className="max-w-[200px] overflow-x-auto flex-nowrap truncate"
                      />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">acao</th>
                      {itemRev &&
                        itemRev.length > 0 &&
                        itemRev[0] &&
                        itemRev[0].length > 0 &&
                        Object.keys(itemRev[0][0]).map((key: string) => (
                          <th key={key} className="border border-gray-400 p-2">
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {itemRev?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2 overflow-hidden max-h-[50px] overflow-y-auto max-w-[500px] flex-nowrap truncate">
                          {item.includes("MOD")
                            ? "MOD"
                            : item.includes("ADD")
                            ? "ADD"
                            : item.includes("DEL")
                            ? "DEL"
                            : ""}
                        </td>
                        {item[0] &&
                          Object.values(item[0]).map(
                            (value: any, index: number) => (
                              <td
                                key={index}
                                className="border border-gray-400 p-2 overflow-hidden max-h-[50px] overflow-y-auto max-w-[500px] flex-nowrap truncate"
                              >
                                {value}
                              </td>
                            )
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Nenhuma alteração encontrada!</p>
            )}
            <h4 className="font-bold">Documentos:</h4>
            {successArquivo && arquivoRev && arquivoRev.length > 0 ? (
              <div className="max-w-full overflow-x-auto">
                <table className="border-collapse border border-gray-400">
                  <colgroup>
                    <col className="max-w-[200px] overflow-x-auto flex-nowrap truncate" />
                    {Object.keys(arquivoRev[0][0]).map((_, index: number) => (
                      <col
                        key={index}
                        className="max-w-[200px] overflow-x-auto flex-nowrap truncate"
                      />
                    ))}
                  </colgroup>
                  <thead>
                    <tr>
                      <th className="border border-gray-400 p-2">acao</th>
                      {arquivoRev &&
                        arquivoRev.length > 0 &&
                        arquivoRev[0] &&
                        arquivoRev[0].length > 0 &&
                        Object.keys(arquivoRev[0][0]).map((key: string) => (
                          <th key={key} className="border border-gray-400 p-2">
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {arquivoRev?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2 overflow-hidden max-h-[50px] overflow-y-auto max-w-[500px] flex-nowrap truncate">
                          {item.includes("MOD")
                            ? "MOD"
                            : item.includes("ADD")
                            ? "ADD"
                            : item.includes("DEL")
                            ? "DEL"
                            : ""}
                        </td>
                        {item[0] &&
                          Object.values(item[0]).map(
                            (value: any, index: number) => (
                              <td
                                key={index}
                                className="border border-gray-400 p-2 overflow-hidden max-h-[50px] overflow-y-auto max-w-[500px] flex-nowrap truncate"
                              >
                                {value}
                              </td>
                            )
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Nenhuma alteração encontrada!</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RevisionDialog;
