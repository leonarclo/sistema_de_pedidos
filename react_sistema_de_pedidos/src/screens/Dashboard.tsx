/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { fetchPedidoColumns } from "@/components/tabela-pedidos/Columns";
import Navbar from "../components/Navbar";
import DataTable from "../components/tabela-pedidos/DataTable";
import { useLazyBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InfoPedido from "@/components/dialogs/InfoPedido";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IPedido } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useGetMeQuery } from "@/redux/api/authApi";
import { getUserState } from "@/redux/features/authSlice";

function Dashboard() {
  const columns = React.useMemo<ColumnDef<IPedido>[]>(
    () => fetchPedidoColumns(),
    []
  );
  const navigate = useNavigate();
  const usuario = useAppSelector((state) => state.getUserState.usuario);
  const dispatch = useAppDispatch();

  const {
    data: userInfo,
    isSuccess: successUser,
    isLoading: loadingUser,
    isError: errorUser,
  } = useGetMeQuery();

  const [triggerBuscarPedidos, { data, isLoading, isError }] =
    useLazyBuscarPedidosQuery();

  useEffect(() => {
    if (successUser) {
      dispatch(getUserState(userInfo));
    }
    if (errorUser) {
      navigate("/login");
    }
  }, [successUser, errorUser]);

  const usuarioSub = usuario?.usuario;
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

  useEffect(() => {
    if (usuario) {
      triggerBuscarPedidos(query);
    }
  }, [data, usuario]);

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
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
