/* eslint-disable react/prop-types */
import { InputTextarea } from "primereact/inputtextarea";
import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";

function ObservacoesPedido() {
  const { pedidoData, setPedidoData } = useContext(PedidoContext);
  return (
    <InputTextarea
      style={{ border: "1px solid gray", padding: "6px" }}
      autoResize
      value={pedidoData.observacoes}
      onChange={(e) =>
        setPedidoData({
          ...pedidoData,
          observacoes: e.target.value,
        })
      }
      rows={10}
      cols={100}
    />
  );
}

export default ObservacoesPedido;
