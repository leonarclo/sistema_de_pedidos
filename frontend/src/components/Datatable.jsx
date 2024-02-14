import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { FilterMatchMode } from "primereact/api";
import { useContext, useState } from "react";
import { PedidoContext } from "../contexts/PedidoContext";
import FetchPedido from "./fetchPedido";

function Datatable() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cnpj: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    empresa: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    catGrupo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    consultor: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    emailLogin: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const { pedidosInfo, isLoadingPedidos, renderVerButton, renderEditarButton } =
    useContext(PedidoContext);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-end mb-4">
        <input
          className="border border-gray-300 rounded p-2"
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Procurar..."
        />
      </div>
    );
  };

  const header = renderHeader();

  const statusBodyTemplate = (data) => {
    const getStatusColor = (status) => {
      switch (status) {
        case "Cancelada":
          return "red";
        case "Nota Fiscal":
          return "green";
        case "Contrato":
          return "orange";
        case "Aberta":
          return "yellow";
        case "Aguardando Aceite":
          return "darkBlue";
        case "Aguardando Pagamento":
          return "lightBlue";
        case "Teste 7 Dias":
          return "purple";
        case "Finalizado":
          return "silver";
        case "Atrelado":
          return "";
        case "Enviado":
          return "";
        case "Omie Contrato":
          return "";
        case "Lançado OMIE":
          return "";
        case "Emitir NFSe":
          return "";
        case "Em Producao":
          return "";
        case "Recusado":
          return "";
        case "Edicao":
          return "";
        case "Bonificacao":
          return "blueboni";
        case "Liberado Financeiro":
          return "";
        case "Troca":
          return "";
        default:
          return null;
      }
    };

    const getStatusTextColor = (status) => {
      switch (status) {
        case "Aberta":
          return "black";
        case "Aguardando Pagamento":
          return "black";
        default:
          return null;
      }
    };

    return (
      <Tag
        value={data.status}
        style={{
          padding: "6px",
          backgroundColor: getStatusColor(data.status),
          color: getStatusTextColor(data.status),
          width: "100%",
          height: "100%",
          borderBottom: "1px solid gray",
          borderRadius: "0px",
          textAlign: "center",
        }}
      ></Tag>
    );
  };

  return (
    <>
      <DataTable
        key={pedidosInfo.id}
        value={pedidosInfo}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        loading={isLoadingPedidos}
        dataKey="id"
        emptyMessage="Nenhum registro encontrado."
        filters={filters}
        filterDisplay="row"
        header={header}
        tableStyle={{ minWidth: "50rem" }}
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} - {last} de {totalRecords}"
        removableSort
        stripedRows
        showGridlines
      >
        <Column
          header="Status"
          field="status"
          sortable
          body={statusBodyTemplate}
          style={{ width: "150px" }}
        />
        <Column
          header="Nº"
          field="id"
          sortable
          style={{ padding: "0 10px 0 10px" }}
        />
        <Column
          header="CNPJ"
          field="cnpj"
          sortable
          style={{ padding: "0 10px 0 10px" }}
        />
        <Column
          header="Empresa"
          field="empresa"
          sortable
          style={{ padding: "0 10px 0 10px" }}
        />
        <Column
          header="Categoria"
          field="categoriaGrupo"
          sortable
          style={{ padding: "0 10px 0 10px" }}
        />
        <Column
          header="Email Sistema"
          field="emailLogin"
          sortable
          style={{ padding: "0 10px 0 10px" }}
        />
        <Column
          body={renderVerButton}
          style={{
            textAlign: "center",
            width: "6rem",
          }}
        />
        <Column
          body={renderEditarButton}
          style={{
            textAlign: "center",
            width: "6rem",
          }}
        />
      </DataTable>
      <FetchPedido />
    </>
  );
}

export default Datatable;
