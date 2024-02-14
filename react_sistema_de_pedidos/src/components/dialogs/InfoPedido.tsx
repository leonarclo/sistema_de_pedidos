import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { closeModal, openModal } from "@/redux/features/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { itensPedidoState } from "@/redux/features/itensPedidoSlice";
import { LoadingSpinner } from "../ui/loading-spinner";

function InfoPedido() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modalState.modals["info"]);
  const pedido = useAppSelector((state) => state.pedidoState.pedido);
  const itensPedido = useAppSelector((state) => state.itensPedidoState.itens);
  const arquivos = useAppSelector((state) => state.arquivosState.arquivos);

  const handleOpenChange = (newOpenState: boolean) => {
    if (newOpenState) {
      dispatch(openModal("info"));
    } else {
      dispatch(closeModal("info"));
      dispatch(itensPedidoState([]));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-white min-w-[75vw] m-2">
        <DialogHeader>
          <DialogTitle>Pedido: {pedido?.id}</DialogTitle>
        </DialogHeader>
        <div className="p-2">
          <div className="flex flex-row gap-4 justify-between p-2">
            <p>
              <span className="text-blue-600 text-sm">Consultor(a):</span>
              <br />
              {pedido?.consultor}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Data:</span> <br />
              {pedido?.data}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Status:</span> <br />
              {pedido?.status}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Origem Lead:</span>
              <br />
              {pedido?.leadOrigem}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Data Lead:</span> <br />
              {pedido?.leadData}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Cargo:</span> <br />
              {pedido?.cargoCliente}
            </p>
          </div>
          <hr />
          <div className="flex flex-row gap-4 justify-between p-2">
            <p>
              <span className="text-blue-600 text-sm">Empresa:</span> <br />
              {pedido?.empresa}
            </p>
            <p>
              <span className="text-blue-600 text-sm">CNPJ:</span> <br />
              {pedido?.cnpj}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Contato (cliente):</span>
              <br />
              {pedido?.nomeCliente}
            </p>
            <p>
              <span className="text-blue-600 text-sm">CPF (cliente):</span>
              <br />
              {pedido?.cpfCliente}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Email:</span> <br />
              {pedido?.email}
            </p>
          </div>
          <hr />
          <div className="flex flex-row gap-4 justify-between p-2">
            <p>
              <span className="text-blue-600 text-sm">Telefone 01:</span>
              <br />
              {pedido?.telefone1}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Telefone 02:</span>
              <br />
              {pedido?.telefone2}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Frete:</span> <br />
              {pedido?.fretePreco}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Transportadora:</span>
              <br />
              {pedido?.transportadora}
            </p>
            <p className="bg-blue-200 px-2">
              <span className="text-blue-600 text-sm"> Email Login:</span>
              <br />
              {pedido?.emailLogin}
            </p>
          </div>
          <hr />
          <div className="flex flex-row gap-4 justify-between p-2">
            <p>
              <span className="text-blue-600 text-sm">CEP:</span> <br />
              {pedido?.cep}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Logradouro:</span>
              <br />
              {pedido?.logradouro}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Nº:</span> <br />
              {pedido?.numeroEndereco}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Complemento:</span>
              <br />
              {pedido?.complemento}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Bairro:</span> <br />
              {pedido?.bairro}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Cidade:</span> <br />
              {pedido?.cidade}
            </p>
            <p>
              <span className="text-blue-600 text-sm">Estado (UF):</span>
              <br />
              {pedido?.estado}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-between p-2  border border-gray-400">
          {itensPedido.length == 0 ? (
            <LoadingSpinner />
          ) : (
            itensPedido &&
            itensPedido.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 justify-between p-2  border border-gray-400"
              >
                {item.categoria === "Venda" ? (
                  <div className="flex flex-row flex-wrap gap-8">
                    <p>
                      <span className="text-blue-600 text-sm">Categoria:</span>
                      <br />
                      {item.categoria}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Produto:</span>
                      <br />
                      {item.produto}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Preço Unitário:
                      </span>
                      <br />
                      {item.preco}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Quantidade:</span>
                      <br />
                      {item.quantidade}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Preço Total:
                      </span>
                      <br />
                      {item.precoTotal}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Nº Funcionários:
                      </span>
                      <br />
                      {item.numeroFuncionarios}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Forma de Pagamento:
                      </span>
                      <br />
                      {item.formaPagamento}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Venc. do 1º boleto:
                      </span>
                      <br />
                      {item.vencimento1Boleto}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-row flex-wrap gap-8">
                    <p>
                      <span className="text-blue-600 text-sm">Categoria:</span>
                      <br />
                      {item.categoria}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Produto:</span>
                      <br />
                      {item.produto}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Preço Unitário:
                      </span>
                      <br />
                      {item.preco}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Quantidade:</span>
                      <br />
                      {item.quantidade}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Preço Total:
                      </span>
                      <br />
                      {item.precoTotal}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Valor Mensal:
                      </span>
                      <br />
                      {item.valorMensal}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Nº Funcionários:
                      </span>
                      <br />
                      {item.numeroFuncionarios}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Forma de Pagamento:
                      </span>
                      <br />
                      {item.formaPagamento}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">
                        Venc. do 1º boleto:
                      </span>
                      <br />
                      {item.vencimento1Boleto}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Pagamento:</span>
                      <br />
                      {item.tipoPagamento}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Duração:</span>
                      <br />
                      {item.duracaoContrato}
                    </p>
                    <p>
                      <span className="text-blue-600 text-sm">Vigência:</span>
                      <br />
                      <span>de: </span>
                      <span className="font-semibold">
                        {item.vigenciaInicio}
                      </span>
                      <br />
                      <span>até: </span>
                      <span className="font-semibold">{item.vigenciaFim}</span>
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mt-4">
          <p>Arquivos: </p>
          {arquivos.map((item) => (
            <a
              key={item.id}
              href={item.arquivo}
              className="flex flex-col text-blue-500 hover:text-blue-700"
            >
              {item.arquivo}
            </a>
          ))}
        </div>
        <div className="mt-4">
          <p>
            <span className="text-blue-600 text-sm">Observações:</span>
            <br />
            {pedido?.observacoes}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InfoPedido;
