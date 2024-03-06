/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import ProdutosDialog from "@/components/dialogs/ProdutosDialog";
import { columns } from "@/components/tabela-produtos/Columns";
import DataTable from "@/components/tabela-produtos/DataTable";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useBuscarProdutosQuery } from "@/redux/api/pedidoApi";
import { getUserState } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Produtos() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useBuscarProdutosQuery();

  const {
    data: userInfo,
    isSuccess: successUser,
    isLoading: loadingUser,
    isError: errorUser,
  } = useGetMeQuery();

  useEffect(() => {
    if (successUser) {
      dispatch(getUserState(userInfo));
    }
    if (errorUser) {
      navigate("/login");
    }
  }, [successUser, errorUser]);

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
  ) : (
    successUser && !loadingUser && (
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
    )
  );
}

export default Produtos;
