import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { statusOptions } from "../constants/statusOptions";
import { cargoOptions } from "../constants/cargoOptions";
import { estadosOptions } from "../constants/estadosOptions";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ItemPedido from "./ItemPedido";
import ArquivoPedido from "./ArquivoPedido";
import { PedidoContext } from "../contexts/PedidoContext";
import { useContext, useEffect } from "react";
import { BASE_URL_API } from "../constants/baseUrlApi";
import NovaObservacao from "./NovaObservacao";

function EditarPedidoForm() {
  const {
    pedidoDataEdicao,
    setPedidoDataEdicao,
    itensData,
    msgErro,
    countItensPedido,
    isModalEditarPedidoVisible,
    setIsModalEditarPedidoVisible,
    adicionarItem,
    removerItem,
    enderecoPeloCep,
    pedidoSelecionado,
  } = useContext(PedidoContext);

  useEffect(() => {
    if (pedidoSelecionado) {
      setPedidoDataEdicao((prevPedidoData) => ({
        ...prevPedidoData,
        ...pedidoSelecionado,
      }));
    }
  }, [pedidoSelecionado, setPedidoDataEdicao]);

  const salvarPedido = async () => {
    const response = await fetch(`${BASE_URL_API}/editar-pedido`, {
      method: "POST",
      body: JSON.stringify({ ...pedidoDataEdicao, ...itensData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao obter dados dos pedidos.");
    }
    const data = await response.json();
    console.log(data);
  };

  const renderNovaObservacao = () => {
    setPedidoDataEdicao((prevPedidoData) => {
      return {
        ...prevPedidoData,
        observacoes:
          prevPedidoData.observacoes + "\n\n" + prevPedidoData.novaObservacao,
      };
    });
  };

  const enviarForm = () => {
    renderNovaObservacao();
    salvarPedido();
    console.log(JSON.stringify({ ...pedidoDataEdicao, ...itensData }));
  };

  const footerConfig = (
    <Button
      type="submit"
      label="Enviar"
      className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 m-5 "
      onClick={enviarForm}
    />
  );

  return (
    <Dialog
      draggable={false}
      resizable={false}
      onHide={() => setIsModalEditarPedidoVisible(false)}
      visible={isModalEditarPedidoVisible}
      header={`Novo Pedido`}
      footer={footerConfig}
      headerStyle={{ padding: "10px 14px" }}
      style={{ minWidth: "60rem" }}
      modal
    >
      <form action="" className="flex flex-col p-4">
        <InputText hidden value={pedidoDataEdicao.chave} />
        <div className="flex flex-row flex-wrap gap-6 justify-start xl:justify-between items-center py-2">
          <div>
            <p>Status:</p>
            <Dropdown
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "16rem",
              }}
              value={pedidoDataEdicao.status}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  status: e.target.value,
                })
              }
              options={statusOptions}
              placeholder="Selecione"
              required
            />
          </div>
          <div className="flex flex-row gap-4 bg-slate-200 p-2 rounded">
            <div>
              <p>Origem do Lead</p>
              <InputText
                style={{
                  border: "1px solid gray",
                  padding: "4px",
                  width: "10rem",
                }}
                value={pedidoDataEdicao.leadOrigem}
                onChange={(e) =>
                  setPedidoDataEdicao({
                    ...pedidoDataEdicao,
                    leadOrigem: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <p>Data do Lead</p>
              <Calendar
                style={{ border: "1px solid gray", borderRadius: "6px" }}
                inputStyle={{
                  padding: "4px",
                  borderRadius: "6px",
                }}
                value={pedidoDataEdicao.leadData}
                onChange={(e) =>
                  setPedidoDataEdicao({
                    ...pedidoDataEdicao,
                    leadData: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div>
            <p>Cargo:</p>
            <Dropdown
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "10rem",
              }}
              value={pedidoDataEdicao.cargoCliente}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  cargo: e.target.value,
                })
              }
              options={cargoOptions}
              panelStyle={{ padding: "16px", textAlign: "start" }}
              placeholder="Selecione"
              required
            />
          </div>
          <div>
            <p>Empresa:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.empresa}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  empresa: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <p>CNPJ:</p>
            <InputMask
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "12rem",
              }}
              value={pedidoDataEdicao.cnpj}
              mask="99.999.999/9999-99"
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  cnpj: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <p>Nº Funcionários:</p>
            <InputNumber
              style={{ border: "1px solid gray", borderRadius: "6px" }}
              inputStyle={{
                padding: "4px",
                borderRadius: "6px",
                width: "8rem",
              }}
              value={pedidoDataEdicao.funcionarios}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  funcionarios: e.value,
                })
              }
              useGrouping={false}
              required
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-start xl:justify-between items-center  py-2">
          <div>
            <p>Contato (Cliente):</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.contatoCliente}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  contatoCliente: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <p>CPF (Cliente):</p>
            <InputMask
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "10rem",
              }}
              value={pedidoDataEdicao.cpfCliente}
              mask="999.999.999-99"
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  cpfCliente: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <p>Email (Cliente):</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.email}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  emailCliente: e.target.value,
                })
              }
              type="email"
              required
            />
          </div>
          <div>
            <p>Telefone 01:</p>
            <InputMask
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "10rem",
              }}
              value={pedidoDataEdicao.telefone1}
              mask="(99) 999999999?9"
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  telefone1: e.target.value,
                })
              }
              type="tel"
              required
            />
          </div>
          <div>
            <p>Telefone 02:</p>
            <InputMask
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "10rem",
              }}
              value={pedidoDataEdicao.telefone2}
              mask="(99) 999999999?9"
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  telefone2: e.target.value,
                })
              }
              type="tel"
              required
            />
          </div>
          <div>
            <p className="font-semibold text-blue-500">Email Sistema Ponto:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.emailLogin}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  emailLoginSistema: e.target.value,
                })
              }
              type="email"
              required
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-6 justify-start xl:justify-between items-center py-2">
          <div>
            <p>CEP:</p>
            <InputMask
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "8rem",
              }}
              value={pedidoDataEdicao.cep}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  cep: e.target.value,
                })
              }
              mask="99999-999"
              required
            />
            <Button
              label="Buscar CEP"
              onClick={() => enderecoPeloCep(pedidoDataEdicao.cep)}
              className="p-1 ms-1 bg-slate-200"
            />
            <p className="text-sm text-red-400">{msgErro}</p>
          </div>
          <div>
            <p>Logradouro:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.logradouro}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  logradouro: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <p>Nº:</p>
            <InputNumber
              style={{
                border: "1px solid gray",
                borderRadius: "6px",
              }}
              inputStyle={{
                padding: "4px",
                borderRadius: "6px",
                width: "6rem",
              }}
              value={pedidoDataEdicao.numeroEndereco}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  numeroEndereco: e.value,
                })
              }
              useGrouping={false}
              required
            />
          </div>
          <div>
            <p>Complemento:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.complemento}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  complemento: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p>Bairro:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.bairro}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  bairro: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p>Cidade:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoDataEdicao.cidade}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  cidade: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p>Estado (UF):</p>
            <Dropdown
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "10rem",
              }}
              value={pedidoDataEdicao.estado}
              onChange={(e) =>
                setPedidoDataEdicao({
                  ...pedidoDataEdicao,
                  estado: e.target.value,
                })
              }
              options={estadosOptions}
              panelStyle={{ padding: "16px", textAlign: "start" }}
              placeholder="Selecione"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-between items-center py-2">
          <div className="flex flex-row gap-4 bg-slate-200 p-2 rounded">
            <div>
              <p>Frete (R$):</p>
              <InputNumber
                style={{ border: "1px solid gray", borderRadius: "6px" }}
                inputStyle={{
                  padding: "4px",
                  borderRadius: "6px",
                }}
                value={pedidoDataEdicao.fretePreco}
                onChange={(e) =>
                  setPedidoDataEdicao({
                    ...pedidoDataEdicao,
                    fretePreco: e.value,
                  })
                }
                mode="currency"
                currency="BRL"
                locale="pr-BR"
                required
              />
            </div>
            <div>
              <p>Transportadora:</p>
              <InputText
                style={{ border: "1px solid gray", padding: "4px" }}
                value={pedidoDataEdicao.transportadora}
                onChange={(e) =>
                  setPedidoDataEdicao({
                    ...pedidoDataEdicao,
                    transportadora: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between py-2">
          <p className="font-semibold py-2">Itens do Pedido: </p>
          <div className="flex flex-row justify-end">
            <Button
              label="Novo Item"
              className="bg-cyan-500 p-2 rounded hover:bg-cyan-700 text-white font-semibold"
              onClick={adicionarItem}
            />
          </div>
        </div>
        {countItensPedido.map((item, index) => (
          <div key={index}>
            <div
              key={index}
              className="bg-blue-100 p-2 border  border-gray-400"
            >
              <ItemPedido item={item} id={index} />
              {index >= 1 ? (
                <div className="flex flex-row justify-end py-2">
                  <Button
                    label="Remover Item"
                    className="bg-red-300 p-1 text-sm rounded hover:bg-red-400 font-semibold"
                    onClick={() => removerItem(index)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
        <hr />
        <p className="font-semibold py-2">Arquivos: </p>
        <ArquivoPedido />
        <hr />
        <p className="font-semibold py-2">Observações: </p>
        <div className="w-1/2">
          <p className="font-bold">Consultor: {pedidoSelecionado.consultor}</p>
          <p>{pedidoSelecionado.observacoes}</p>
          <div className="flex">
            <Button
              label="Salvar nova observação"
              className="bg-blue-500 text-white"
              onClick={renderNovaObservacao}
            />
            <NovaObservacao />
          </div>
        </div>
        <div></div>
      </form>
    </Dialog>
  );
}

export default EditarPedidoForm;
