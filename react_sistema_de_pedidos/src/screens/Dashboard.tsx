/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { fetchPedidoColumns } from "@/components/tabela-pedidos/Columns";
import Navbar from "../components/Navbar";
import DataTable from "../components/tabela-pedidos/DataTable";
import { useBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InfoPedido from "@/components/dialogs/InfoPedido";
import { useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPedido } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

function Dashboard() {
  const columns = React.useMemo<ColumnDef<IPedido>[]>(
    () => fetchPedidoColumns(),
    []
  );
  const navigate = useNavigate();
  const usuario = useAppSelector((state) => state.getUserState.usuario);

  const usuarioSub = usuario?.sub;
  const usuarioId = usuario?.id;
  const usuarioNivel = usuario?.nivel;

  const query =
    usuarioSub && usuarioId && usuarioNivel
      ? {
          consultor: usuarioSub,
          consultorId: usuarioId,
          consultorNivel: usuarioNivel,
        }
      : undefined;

  const { data, isLoading, isError } = useBuscarPedidosQuery(query);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [isError, navigate]);

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
