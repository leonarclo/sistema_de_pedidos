import { InputTextarea } from "primereact/inputtextarea";
import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";

function NovaObservacao() {
  const { pedidoData, setPedidoData } = useContext(PedidoContext);

  const MAX_ROWS = 5;

  const handleTextareaChange = (e) => {
    const textareaLines = e.target.value.split("\n").length;
    const rows = Math.min(MAX_ROWS, textareaLines);

    setPedidoData((prevPedidoData) => ({
      ...prevPedidoData,
      novaObservacao: e.target.value,
      rows: rows,
    }));
  };

  return (
    <>
      <InputTextarea
        style={{ border: "1px solid gray", padding: "6px" }}
        autoResize
        value={pedidoData.novaObservacao}
        onChange={handleTextareaChange}
        rows={pedidoData.rows || 1}
        cols={100}
      />
    </>
  );
}

export default NovaObservacao;
