/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import ItemPedido from "../components/ItemPedido";
import { formatarDataParaChave } from "../utils/formatarDataParaChave";
import { BASE_URL_API } from "../constants/baseUrlApi";
import { useQuery } from "react-query";
import { Button } from "primereact/button";

export const PedidoContext = createContext();

export const PedidoContextProvider = ({ children }) => {
  const [pedidoData, setPedidoData] = useState({
    status: "",
    leadOrigem: "",
    leadData: "",
    cargoCliente: "",
    empresa: "",
    cnpj: "",
    nomeCliente: "",
    cpfCliente: "",
    email: "",
    telefone1: "",
    telefone2: "",
    emailLogin: "",
    fretePreco: "",
    transportadora: "",
    cep: "",
    logradouro: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    funcionarios: "",
    observacoes: "",
    novaObservacao: "",
    chave: formatarDataParaChave(),
  });

  const [pedidoDataEdicao, setPedidoDataEdicao] = useState({
    status: "",
    leadOrigem: "",
    leadData: "",
    cargoCliente: "",
    empresa: "",
    cnpj: "",
    nomeCliente: "",
    cpfCliente: "",
    email: "",
    telefone1: "",
    telefone2: "",
    emailLogin: "",
    fretePreco: "",
    transportadora: "",
    cep: "",
    logradouro: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    funcionarios: "",
    observacoes: "",
    novaObservacao: "",
    chave: formatarDataParaChave(),
  });

  const [itensData, setItensData] = useState({
    produto: [],
    categoria: [],
    precoUnitario: [],
    quantidade: [],
    software: [],
    valorMensal: [],
    formaPagamento: [],
    vencPrimeiroBoleto: [],
    pagamentoContrato: [],
    duracaoContrato: [],
    vigenciaInicio: [],
    vigenciaFim: [],
    arquivo: [],
    valorTotal: [],
  });
  const [msgErro, setMsgErro] = useState([]);
  const [countItensPedido, setCountItensPedido] = useState([
    <ItemPedido key={1} />,
  ]);

  const [isModalVerPedidoVisible, setIsModalVerPedidoVisible] = useState(false);
  const [isModalNovoPedidoVisible, setIsModalNovoPedidoVisible] =
    useState(false);
  const [isModalEditarPedidoVisible, setIsModalEditarPedidoVisible] =
    useState(false);
  const [itensPedido, setItensPedido] = useState([]);
  const [arquivosData, setArquivosData] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState([]);

  const buscarItens = async (chave) => {
    const res = await fetch(`${BASE_URL_API}/buscar-item?chave=${chave}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Erro ao obter dados dos pedidos.");
    }
    const data = await res.json();
    setItensPedido(data);
    console.log(data);
    return data;
  };

  const buscarArquivos = async (chave) => {
    try {
      const response = await fetch(`${BASE_URL_API}/buscar-arquivos`, {
        method: "POST",
        body: JSON.stringify({ chave }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao obter dados dos pedidos.");
      }

      const data = await response.json();
      setArquivosData(data);
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const buscarPedidos = async () => {
    const response = await fetch(`${BASE_URL_API}/buscar-pedidos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Erro ao obter dados dos pedidos.");
    }

    return response.json();
  };

  const { data: pedidosInfo, isLoading: isLoadingPedidos } = useQuery(
    "pedidoData",
    buscarPedidos
  );

  if (isLoadingPedidos) {
    return <div>Carregando...</div>;
  }

  const adicionarItem = () => {
    setCountItensPedido((prevItens) => [
      ...prevItens,
      <ItemPedido key={prevItens.length + 1} />,
    ]);
  };

  const removerItem = (indexToRemove) => {
    const filteredItens = countItensPedido.filter(
      (_, index) => index !== indexToRemove
    );
    setCountItensPedido(filteredItens);
  };

  const handleVerClick = (rowData) => {
    setPedidoSelecionado(rowData);
    setIsModalVerPedidoVisible(true);
    buscarItens(rowData.chave);
    buscarArquivos(rowData.chave);
  };

  const handleEditarClick = (rowData) => {
    setPedidoSelecionado(rowData);
    setIsModalEditarPedidoVisible(true);
    buscarItens(rowData.chave);
    buscarArquivos(rowData.chave);
  };

  const closeModal = () => {
    setIsModalVerPedidoVisible(false);
    setIsModalEditarPedidoVisible(false);
    setIsModalNovoPedidoVisible(false);
  };

  const renderVerButton = (rowData) => {
    return (
      <Button
        label="Ver"
        className="bg-orange-400 hover:bg-orange-500 p-2 mx-2 my-1"
        onClick={() => handleVerClick(rowData)}
      />
    );
  };

  const renderEditarButton = (rowData) => {
    return (
      <Button
        label="Editar"
        className="bg-green-400 hover:bg-green-500 p-2 mx-2 my-1"
        onClick={() => handleEditarClick(rowData)}
      />
    );
  };

  const enderecoPeloCep = async (cep) => {
    try {
      const response = await fetch(
        `https://brasilapi.com.br/api/cep/v1/${cep}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response || response.status == 404) {
        setMsgErro(`Endereço não encontrado para o CEP: ${pedidoData.cep}`);
        throw new Error(
          `Endereço não encontrado para o CEP: ${pedidoData.cep}`
        );
      }
      const data = await response.json();
      setMsgErro("");
      pedidoData.logradouro = data.street;
      pedidoData.bairro = data.neighborhood;
      pedidoData.cidade = data.city;
      pedidoData.estado = data.state;
    } catch (error) {
      setMsgErro(`Erro ao obter endereço!`);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidoData,
        setPedidoData,
        itensData,
        setItensData,
        msgErro,
        setMsgErro,
        countItensPedido,
        setCountItensPedido,
        isModalVerPedidoVisible,
        setIsModalVerPedidoVisible,
        isModalEditarPedidoVisible,
        setIsModalEditarPedidoVisible,
        isModalNovoPedidoVisible,
        setIsModalNovoPedidoVisible,
        itensPedido,
        setItensPedido,
        buscarItens,
        adicionarItem,
        removerItem,
        buscarArquivos,
        arquivosData,
        pedidosInfo,
        pedidoSelecionado,
        setPedidoSelecionado,
        isLoadingPedidos,
        handleVerClick,
        closeModal,
        buscarPedidos,
        renderVerButton,
        enderecoPeloCep,
        renderEditarButton,
        pedidoDataEdicao,
        setPedidoDataEdicao,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};
