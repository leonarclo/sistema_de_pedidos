/* eslint-disable react/prop-types */
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
import ObservacoesPedido from "./ObservacoesPedido";
import { PedidoContext } from "../contexts/PedidoContext";
import { useContext } from "react";
import { BASE_URL_API } from "../constants/baseUrlApi";

function NovoPedidoForm() {
  const {
    pedidoData,
    setPedidoData,
    itensData,
    msgErro,
    countItensPedido,
    isModalNovoPedidoVisible,
    setIsModalNovoPedidoVisible,
    adicionarItem,
    removerItem,
    enderecoPeloCep,
  } = useContext(PedidoContext);

  const salvarPedido = async () => {
    const response = await fetch(`${BASE_URL_API}/inserir-pedido`, {
      method: "POST",
      body: JSON.stringify({ ...pedidoData, ...itensData }),
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

  const enviarForm = () => {
    salvarPedido();
    console.log(JSON.stringify({ ...pedidoData, ...itensData }));
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
      onHide={() => setIsModalNovoPedidoVisible(false)}
      visible={isModalNovoPedidoVisible}
      header={`Novo Pedido`}
      footer={footerConfig}
      headerStyle={{ padding: "10px 14px" }}
      style={{ minWidth: "60rem" }}
      modal
    >
      <form action="" className="flex flex-col p-4">
        <InputText hidden value={pedidoData.chave} />
        <div className="flex flex-row flex-wrap gap-6 justify-start xl:justify-between items-center py-2">
          <div>
            <p>Status:</p>
            <Dropdown
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "16rem",
              }}
              value={pedidoData.status}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, status: e.target.value })
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
                value={pedidoData.nomeLead}
                onChange={(e) =>
                  setPedidoData({ ...pedidoData, nomeLead: e.target.value })
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
                value={pedidoData.dataLead}
                onChange={(e) =>
                  setPedidoData({ ...pedidoData, dataLead: e.target.value })
                }
                dateFormat="dd/mm/yy"
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
              value={pedidoData.cargo}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, cargo: e.target.value })
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
              value={pedidoData.empresa}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, empresa: e.target.value })
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
              value={pedidoData.cnpj}
              mask="99.999.999/9999-99"
              onChange={(e) =>
                setPedidoData({ ...pedidoData, cnpj: e.target.value })
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
              value={pedidoData.funcionarios}
              onChange={(e) =>
                setPedidoData({
                  ...pedidoData,
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
              value={pedidoData.contatoCliente}
              onChange={(e) =>
                setPedidoData({
                  ...pedidoData,
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
              value={pedidoData.cpfCliente}
              mask="999.999.999-99"
              onChange={(e) =>
                setPedidoData({
                  ...pedidoData,
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
              value={pedidoData.emailCliente}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, emailCliente: e.target.value })
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
              value={pedidoData.telefone1}
              mask="(99) 999999999?9"
              onChange={(e) =>
                setPedidoData({ ...pedidoData, telefone1: e.target.value })
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
              value={pedidoData.telefone2}
              mask="(99) 999999999?9"
              onChange={(e) =>
                setPedidoData({ ...pedidoData, telefone2: e.target.value })
              }
              type="tel"
              required
            />
          </div>
          <div>
            <p className="font-semibold text-blue-500">Email Sistema Ponto:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoData.emailLogin}
              onChange={(e) =>
                setPedidoData({
                  ...pedidoData,
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
              value={pedidoData.cep}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, cep: e.target.value })
              }
              mask="99999-999"
              required
            />
            <Button
              label="Buscar CEP"
              onClick={() => enderecoPeloCep(pedidoData.cep)}
              className="p-1 ms-1 bg-slate-200 text-gray-500 border-none"
            />
            <p className="text-sm text-red-400">{msgErro}</p>
          </div>
          <div>
            <p>Logradouro:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoData.logradouro}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, logradouro: e.target.value })
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
              value={pedidoData.numeroEndereco}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, numeroEndereco: e.value })
              }
              useGrouping={false}
              required
            />
          </div>
          <div>
            <p>Complemento:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoData.complemento}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, complemento: e.target.value })
              }
            />
          </div>
          <div>
            <p>Bairro:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoData.bairro}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, bairro: e.target.value })
              }
            />
          </div>
          <div>
            <p>Cidade:</p>
            <InputText
              style={{ border: "1px solid gray", padding: "4px" }}
              value={pedidoData.cidade}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, cidade: e.target.value })
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
              value={pedidoData.estado}
              onChange={(e) =>
                setPedidoData({ ...pedidoData, estado: e.target.value })
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
                value={pedidoData.fretePreco}
                onChange={(e) =>
                  setPedidoData({ ...pedidoData, fretePreco: e.value })
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
                value={pedidoData.transportadora}
                onChange={(e) =>
                  setPedidoData({
                    ...pedidoData,
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
        <div>
          <ObservacoesPedido />
        </div>
      </form>
    </Dialog>
  );
}

export default NovoPedidoForm;
