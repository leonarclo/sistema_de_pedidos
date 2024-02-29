/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronDown } from "lucide-react";
import NovoPedidoDialog from "./dialogs/NovoPedido";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserState } from "@/redux/features/authSlice";
import { useEffect } from "react";
import { ITokenPayload } from "@/types";
import LogoutDialog from "./dialogs/LogoutDialog";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tokenString = localStorage.getItem("token");
  const userInfo = tokenString ? jwtDecode(tokenString) : null;
  const usuario = useAppSelector((state) => state.getUserState.usuario);

  const thisPage = location.pathname;
  const loginPage =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/login";

  useEffect(() => {
    dispatch(getUserState(userInfo as ITokenPayload));
  }, []);

  useEffect(() => {
    if (!userInfo) {
      navigate(loginPage);
    }
  }, []);

  let nivel;
  switch (usuario?.nivel) {
    case 9:
      nivel = "Master";
      break;
    case 7:
      nivel = "ADM";
      break;
    case 5:
      nivel = "Editor";
      break;
    case 1:
      nivel = "Consultor";
      break;
    case 0:
      nivel = "Inativo";
      break;
    default:
      nivel = "Desconhecido";
      break;
  }

  return (
    <>
      <div className="container bg-white mx-auto border rounded-md p-5 m-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">
            Olá,{" "}
            <span className="capitalize">
              {userInfo?.sub}!{" "}
              <sup className="text-sm text-orange-400 font-bold">{nivel}</sup>
            </span>
          </h1>
          <div className="flex gap-10">
            {thisPage === "/" ? (
              <NovoPedidoDialog />
            ) : (
              <a href="/">
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="bg-emerald-500 hover:bg-emerald-700 rounded text-white font-bold focus:outline-none"
                >
                  Painel
                </Button>
              </a>
            )}
            {usuario && usuario.nivel >= 7 ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-cyan-500 hover:bg-cyan-700 rounded text-white font-bold flex items-center gap-2 px-5 focus:outline-none">
                  Admin
                  <ChevronDown size={18} color="white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white p-3 flex flex-col gap-2">
                  <a href="/usuarios">
                    <DropdownMenuItem className="cursor-pointer">
                      Gerenciar usuários
                    </DropdownMenuItem>
                  </a>

                  <a href="/produtos">
                    <DropdownMenuItem className="cursor-pointer ">
                      Gerenciar produtos
                    </DropdownMenuItem>
                  </a>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
            <LogoutDialog />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
