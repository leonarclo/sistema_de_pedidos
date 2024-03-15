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
import LogoutDialog from "./dialogs/LogoutDialog";
import { useGetMeQuery } from "@/redux/api/authApi";
import { LoadingSpinner } from "./ui/loading-spinner";
import { nivelAcessoString } from "@/lib/nivelAcessoString";

function Navbar() {
  const thisPage = location.pathname;
  const { data: userInfo, isLoading } = useGetMeQuery();

  return (
    <>
      <div className="container bg-white mx-auto border rounded-md p-5 m-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">
            Olá,{" "}
            {userInfo && !isLoading ? (
              <span className="capitalize">
                {userInfo && userInfo.usuario}!{" "}
                <sup className="text-sm text-orange-400 font-bold">
                  {nivelAcessoString(userInfo.nivel)}
                </sup>
              </span>
            ) : (
              <LoadingSpinner />
            )}
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
            {userInfo && userInfo.nivel >= 7 ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-cyan-500 hover:bg-cyan-700 rounded text-white font-bold flex items-center gap-2 px-5 focus:outline-none">
                  Admin
                  <ChevronDown size={18} color="white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white p-3 flex flex-col gap-2">
                  {userInfo.nivel == 9 && (
                    <a href="/usuarios">
                      <DropdownMenuItem className="cursor-pointer">
                        Gerenciar usuários
                      </DropdownMenuItem>
                    </a>
                  )}

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
