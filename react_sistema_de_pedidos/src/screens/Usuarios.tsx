import Navbar from "@/components/Navbar";
import { columns } from "@/components/tabela-usuarios/Columns";
import DataTable from "@/components/tabela-usuarios/DataTable";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBuscarUsuariosQuery } from "@/redux/api/usuariosApi";

function AdmUsuarios() {
  const { data, isLoading } = useBuscarUsuariosQuery();
  return (
    <>
      <Navbar />
      <div className="container bg-white mx-auto border rounded-md p-5 m-5 min-h-full">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}

export default AdmUsuarios;
