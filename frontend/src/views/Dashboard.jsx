import { Button } from "primereact/button";
import Datatable from "../components/Datatable";
import NovoPedidoForm from "../components/NovoPedidoForm";
import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";
import EditarPedidoForm from "../components/EditarPedidoForm";

function Dashboard() {
  const { setIsModalNovoPedidoVisible } = useContext(PedidoContext);

  return (
    <>
      <div className="container bg-white mx-auto border rounded-md p-5 m-5">
        <div className="flex items-center justify-around mb-14">
          <h1 className="text-2xl">Olá</h1>
          <h1 className="text-2xl">Cadastro de Pedidos</h1>
          <div className="flex gap-8">
            <Button
              label="+ Novo Pedido"
              className="bg-green-400 p-2 rounded hover:bg-green-500 font-semibold border-none"
              onClick={() => setIsModalNovoPedidoVisible(true)}
            />
            <Button
              label="Sair"
              className="bg-red-400 p-2 rounded hover:bg-red-500 font-semibold border-none"
            />
          </div>
        </div>
        <Datatable />
      </div>
      <NovoPedidoForm />;
      <EditarPedidoForm />;
    </>
  );
}

export default Dashboard;
