import Navbar from "@/components/Navbar";
import UsuarioDialog from "@/components/dialogs/UsuarioDialog";
import { columns } from "@/components/tabela-usuarios/Columns";
import DataTable from "@/components/tabela-usuarios/DataTable";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBuscarUsuariosQuery } from "@/redux/api/usuariosApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdmUsuarios() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useBuscarUsuariosQuery();

  useEffect(() => {
    if (isError) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [isError]);
  return (
    <>
      <Navbar />
      <div className="container bg-white mx-auto border rounded-md p-5 m-5 min-h-full flex flex-col">
        <UsuarioDialog />
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
