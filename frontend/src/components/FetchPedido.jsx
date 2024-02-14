import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";
import FetchArquivos from "./FetchArquivos";
import FetchItensPedido from "./FetchItensPedido";

function FetchPedido() {
  const { isModalVerPedidoVisible, closeModal, pedidoSelecionado } =
    useContext(PedidoContext);

  return (
    <>
      <Dialog
        draggable={false}
        resizable={false}
        visible={isModalVerPedidoVisible}
        onHide={closeModal}
        header={`ID do Pedido: ${pedidoSelecionado && pedidoSelecionado.id}`}
        footer={
          <Button
            label="Fechar"
            onClick={closeModal}
            className="bg-red-400 hover:bg-red-500 p-2 m-3"
          />
        }
        headerStyle={{ padding: "10px 14px" }}
        style={{ width: "80rem" }}
        modal
      >
        {pedidoSelecionado && (
          <div className="p-2">
            <div className="flex flex-row gap-4 justify-between p-2">
              <p>
                <span className="text-blue-600 text-sm">Consultor(a):</span>
                <br />
                {pedidoSelecionado.consultor}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Data:</span> <br />
                {pedidoSelecionado.data}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Status:</span> <br />
                {pedidoSelecionado.status}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Origem Lead:</span>
                <br />
                {pedidoSelecionado.leadOrigem}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Data Lead:</span> <br />
                {pedidoSelecionado.leadData}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Cargo:</span> <br />
                {pedidoSelecionado.cargoCliente}
              </p>
            </div>
            <hr />
            <div className="flex flex-row gap-4 justify-between p-2">
              <p>
                <span className="text-blue-600 text-sm">Empresa:</span> <br />
                {pedidoSelecionado.empresa}
              </p>
              <p>
                <span className="text-blue-600 text-sm">CNPJ:</span> <br />
                {pedidoSelecionado.cnpj}
              </p>
              <p>
                <span className="text-blue-600 text-sm">
                  Contato (cliente):
                </span>
                <br />
                {pedidoSelecionado.nomeCliente}
              </p>
              <p>
                <span className="text-blue-600 text-sm">CPF (cliente):</span>
                <br />
                {pedidoSelecionado.cpfCliente}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Email:</span> <br />
                {pedidoSelecionado.email}
              </p>
            </div>
            <hr />
            <div className="flex flex-row gap-4 justify-between p-2">
              <p>
                <span className="text-blue-600 text-sm">Telefone 01:</span>
                <br />
                {pedidoSelecionado.telefone1}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Telefone 02:</span>
                <br />
                {pedidoSelecionado.telefone2}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Frete:</span> <br />
                {pedidoSelecionado.frete}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Transportadora:</span>
                <br />
                {pedidoSelecionado.transportadora}
              </p>
              <p className="bg-blue-200 px-2">
                <span className="text-blue-600 text-sm"> Email Login:</span>
                <br />
                {pedidoSelecionado.emailLogin}
              </p>
            </div>
            <hr />
            <div className="flex flex-row gap-4 justify-between p-2">
              <p>
                <span className="text-blue-600 text-sm">CEP:</span> <br />
                {pedidoSelecionado.cep}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Logradouro:</span>
                <br />
                {pedidoSelecionado.logradouro}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Nº:</span> <br />
                {pedidoSelecionado.numeroEndereco}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Complemento:</span>
                <br />
                {pedidoSelecionado.complemento}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Bairro:</span> <br />
                {pedidoSelecionado.bairro}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Cidade:</span> <br />
                {pedidoSelecionado.cidade}
              </p>
              <p>
                <span className="text-blue-600 text-sm">Estado (UF):</span>
                <br />
                {pedidoSelecionado.estado}
              </p>
            </div>
            <hr />
            <FetchItensPedido />
            <hr />
            <FetchArquivos />
          </div>
        )}
      </Dialog>
    </>
  );
}

export default FetchPedido;
