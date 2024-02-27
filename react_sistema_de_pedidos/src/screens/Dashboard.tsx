/* eslint-disable react-hooks/rules-of-hooks */
import { columns } from "@/components/tabela-pedidos/Columns";
import Navbar from "../components/Navbar";
import DataTable from "../components/tabela-pedidos/DataTable";
import { useBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InfoPedido from "@/components/dialogs/InfoPedido";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const usuario = useAppSelector((state) => state.getUserState.usuario);

  const usuarioSub = usuario?.sub;
  const usuarioId = usuario?.id;

  const query =
    usuarioSub && usuarioId && usuario?.nivel < 7
      ? { consultor: usuarioSub, consultorId: usuarioId }
      : undefined;

  const { data, isLoading, isError } = useBuscarPedidosQuery(query);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [isError]);

  return (
    <>
      <Navbar />
      <div className="container bg-white mx-auto border rounded-md p-5 m-5 min-h-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
        <InfoPedido />
      </div>
    </>
  );
}

export default Dashboard;
