import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";

function FetchArquivos() {
  const { arquivosData } = useContext(PedidoContext);

  return (
    <div className="bg-gray-100 p-2">
      {arquivosData &&
        arquivosData.map((item, index) => (
          <div key={item.id} className="flex flex-row justify-between ">
            <div className="text-sm">
              <span className="text-blue-600 text-sm">{`Arquivo ${
                index + 1
              }:`}</span>
              <br />
              <a
                href={item.arquivo}
                className="text-blue-400 underline hover:text-blue-600 text-sm"
              >
                {item.arquivo}
              </a>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FetchArquivos;
