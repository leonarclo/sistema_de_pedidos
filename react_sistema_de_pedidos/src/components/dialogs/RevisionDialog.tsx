/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { StickyNote } from "lucide-react";
import {
  useLazyItemRevisionsQuery,
  useLazyPedidoRevisionsQuery,
} from "@/redux/api/logApi";
import { useEffect } from "react";

function RevisionDialog({ row }: any) {
  const [
    triggerPedidoRevisions,
    { data: pedidoRev, isSuccess: successPedido },
  ] = useLazyPedidoRevisionsQuery();
  const [triggerItemRevisions, { data: itemRev, isSuccess: successItem }] =
    useLazyItemRevisionsQuery();

  const handleClickRevisoesButton = async (e: any, row: any) => {
    e.stopPropagation();
    row.getIsSelected();
    triggerPedidoRevisions(row.original.id);
    triggerItemRevisions(row.original.id);
  };

  useEffect(() => {
    if (successItem) {
      itemRev?.forEach((item) => {
        console.log(item);
      });
    }
  }, [successItem, itemRev]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={(e) => handleClickRevisoesButton(e, row)}
          style={{ cursor: "pointer" }}
          className="border p-3 border-gray-400 hover:bg-gray-300 z-20"
        >
          <StickyNote />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white min-w-[75vw] max-h-[90vh] m-2 overflow-y-scroll text-sm">
        {/* <DialogHeader>
          <DialogTitle>Pedido:</DialogTitle>
        </DialogHeader> */}
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
                    </tr>
                  </thead>
                  <tbody>
                    {pedidoRev?.map((pedido: any, index: number) => (
                      <tr key={index}>
                        <td className="border border-gray-400 p-2 overflow-hidden max-h-[50px] overflow-y-auto max-w-[500px] flex-nowrap truncate">
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
            <h4 className="font-bold">Item:</h4>
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RevisionDialog;
