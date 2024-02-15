import NovoPedidoDialog from "./dialogs/NovoPedido";

function Navbar() {
  return (
    <>
      <div className="container bg-white mx-auto border rounded-md p-5 m-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl"></h1>
          <div className="flex gap-10">
            <NovoPedidoDialog />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
