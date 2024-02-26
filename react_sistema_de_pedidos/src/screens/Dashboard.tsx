/* eslint-disable react-hooks/rules-of-hooks */
import { columns } from "@/components/tabela-pedidos/Columns";
import Navbar from "../components/Navbar";
import DataTable from "../components/tabela-pedidos/DataTable";
import { useBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InfoPedido from "@/components/dialogs/InfoPedido";
import { useAppSelector } from "@/redux/store";

function Dashboard() {
  const usuario = useAppSelector((state) => state.getUserState.usuario);

  const usuarioSub = usuario?.sub;
  const usuarioId = usuario?.id;

  const query =
    usuarioSub && usuarioId && usuario?.nivel < 7
      ? { consultor: usuarioSub, consultorId: usuarioId }
      : undefined;

  console.log(query);

  const { data, isLoading } = useBuscarPedidosQuery(query);

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
