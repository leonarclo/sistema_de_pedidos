import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";

function FetchItensPedido() {
  const { itensPedido } = useContext(PedidoContext);

  return (
    <>
      {itensPedido &&
        itensPedido.map((item) => (
          <div key={item.id}>
            <div className="flex flex-row gap-4 justify-between p-2 bg-gray-200 border border-gray-400">
              {item.categoria == "Venda" ? (
                <>
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
                    <span className="text-blue-600 text-sm">Preço Total:</span>
                    <br />
                    {item.precoTotal}
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">
                      Nº Funcionários:
                    </span>
                    <br />
                    {item.numerofuncionarios}
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
                </>
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
                    <span className="text-blue-600 text-sm">Preço Total:</span>
                    <br />
                    {item.precoTotal}
                  </p>
                  <p>
                    <span className="text-blue-600 text-sm">Valor Mensal:</span>
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
                    <span className="font-semibold">{item.vigenciaInicio}</span>
                    <br />
                    <span>até: </span>
                    <span className="font-semibold">{item.vigenciaFim}</span>
                  </p>
                </div>
              )}
            </div>
            <hr />
          </div>
        ))}
    </>
  );
}

export default FetchItensPedido;
