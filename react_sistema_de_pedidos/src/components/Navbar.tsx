import { ChevronDown } from "lucide-react";
import NovoPedidoDialog from "./dialogs/NovoPedido";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function Navbar() {
  return (
    <>
      <div className="container bg-white mx-auto border rounded-md p-5 m-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl"></h1>
          <div className="flex gap-10">
            <NovoPedidoDialog />
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-cyan-500 hover:bg-cyan-700 rounded text-white font-bold flex items-center gap-2 px-5 focus:outline-none">
                Admin
                <ChevronDown size={18} color="white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3 flex flex-col gap-2">
                <DropdownMenuItem className="cursor-pointer">
                  Gerenciar usuários
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer ">
                  Gerenciar produtos
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant={"link"} className="hover:text-red-400">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
