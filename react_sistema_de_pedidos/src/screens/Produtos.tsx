/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import ProdutosDialog from "@/components/dialogs/ProdutosDialog";
import { columns } from "@/components/tabela-produtos/Columns";
import DataTable from "@/components/tabela-produtos/DataTable";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBuscarProdutosQuery } from "@/redux/api/pedidoApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Produtos() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useBuscarProdutosQuery();

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
        <ProdutosDialog />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          data && <DataTable columns={columns} data={data} />
        )}
      </div>
    </>
  );
}

export default Produtos;
