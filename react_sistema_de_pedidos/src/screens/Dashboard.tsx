import { columns } from "@/components/tabela-pedidos/Columns";
import Navbar from "../components/Navbar";
import DataTable from "../components/tabela-pedidos/DataTable";
import { useBuscarPedidosQuery } from "@/redux/api/pedidoApi";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import InfoPedido from "@/components/dialogs/InfoPedido";

function Dashboard() {
  const { data, isLoading } = useBuscarPedidosQuery();

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
