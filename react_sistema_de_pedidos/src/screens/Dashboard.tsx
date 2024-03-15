/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { fetchPedidoColumns } from "@/components/tabela-pedidos/Columns";
import Navbar from "../components/Navbar";
import DataTable from "../components/tabela-pedidos/DataTable";
import { useLazyBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InfoPedido from "@/components/dialogs/InfoPedido";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPedido } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useGetMeQuery } from "@/redux/api/authApi";
import Cookies from "js-cookie";

function Dashboard() {
  const columns = React.useMemo<ColumnDef<IPedido>[]>(
    () => fetchPedidoColumns(),
    []
  );
  const navigate = useNavigate();

  const {
    data: userInfo,
    isSuccess: successUser,
    isLoading: loadingUser,
    isError: errorUser,
  } = useGetMeQuery();

  const [triggerBuscarPedidos, { data, isLoading, isError }] =
    useLazyBuscarPedidosQuery();

  useEffect(() => {
    if (errorUser) {
      navigate("/login");
    }
  }, [successUser, errorUser]);

  const usuarioId = userInfo?.id;
  const query = usuarioId ? { consultorId: usuarioId } : undefined;

  useEffect(() => {
    if (successUser) {
      triggerBuscarPedidos(query);
    }
  }, [userInfo]);

  useEffect(() => {
    if (isError) {
      Cookies.remove("access_token");
      navigate("/login");
    }
  }, [isError]);

  return loadingUser ? (
    <div className="h-screen w-screen">
      <LoadingSpinner />
    </div>
  ) : successUser && !loadingUser ? (
    <div>
      <Navbar />
      <div className="container bg-white mx-auto border rounded-md p-5 m-5 min-h-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
        <InfoPedido />
      </div>
    </div>
  ) : null;
}

export default Dashboard;
