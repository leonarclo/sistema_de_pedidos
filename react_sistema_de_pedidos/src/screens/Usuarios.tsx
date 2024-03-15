/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "@/components/Navbar";
import UsuarioDialog from "@/components/dialogs/UsuarioDialog";
import { columns } from "@/components/tabela-usuarios/Columns";
import DataTable from "@/components/tabela-usuarios/DataTable";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useBuscarUsuariosQuery } from "@/redux/api/usuariosApi";
import { getUserState } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdmUsuarios() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useBuscarUsuariosQuery();

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

    if (errorUser || isError) {
      Cookies.remove("access_token");
      navigate("/login");
    }
  }, [successUser, errorUser, isError]);

  return loadingUser ? (
    <div className="h-screen w-screen">
      <LoadingSpinner />
    </div>
  ) : (
    successUser && !loadingUser && (
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
    )
  );
}

export default AdmUsuarios;
