/* eslint-disable react/prop-types */
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import {
  produtoVendaOptions,
  produtoContratoOptions,
} from "../constants/produtosOptions";
import { useContext } from "react";
import { PedidoContext } from "../contexts/PedidoContext";

function ItemPedido({ id }) {
  const { itensData, setItensData } = useContext(PedidoContext);

  const handleChange = (key, value) => {
    const updatedArray = [...itensData[key]];
    updatedArray[id] = value;
    setItensData({ ...itensData, [key]: updatedArray });
  };

  itensData.valorTotal[id] =
    itensData.quantidade[id] * itensData.precoUnitario[id];

  return (
    <>
      <div className="flex flex-row flex-wrap gap-6 justify-start xl:justify-between items-center py-2">
        <div>
          <p>Categoria:</p>
          <Dropdown
            style={{
              border: "1px solid gray",
              padding: "4px",
              width: "10rem",
            }}
            value={itensData.categoria[id]}
            onChange={(e) => handleChange("categoria", e.value)}
            options={["Venda", "Contrato"]}
            placeholder="Selecione"
            required
          />
        </div>
        <div>
          <p>Produto:</p>
          <Dropdown
            style={{
              border: "1px solid gray",
              padding: "4px",
              width: "40rem",
            }}
            value={itensData.produto[id]}
            onChange={(e) => handleChange("produto", e.value)}
            options={
              itensData.categoria[id] == "Venda"
                ? produtoVendaOptions
                : produtoContratoOptions
            }
            optionLabel="name"
            placeholder="Selecione"
            required
          />
        </div>
        <div>
          <p>Preço Unitário:</p>
          <InputNumber
            style={{ border: "1px solid gray", borderRadius: "6px" }}
            inputStyle={{
              padding: "4px",
              borderRadius: "6px",
            }}
            value={itensData.precoUnitario[id]}
            onChange={(e) => handleChange("precoUnitario", e.value)}
            mode="currency"
            currency="BRL"
            locale="pr-BR"
            required
          />
        </div>
        <div>
          <p>Quantidade:</p>
          <InputNumber
            style={{ border: "1px solid gray", borderRadius: "6px" }}
            inputStyle={{
              padding: "4px",
              borderRadius: "6px",
            }}
            value={itensData.quantidade[id]}
            onChange={(e) => handleChange("quantidade", e.value)}
            useGrouping={false}
            required
          />
        </div>
        <div>
          <p>Preço Total:</p>
          <InputNumber
            style={{ border: "1px solid gray", borderRadius: "6px" }}
            inputStyle={{
              padding: "4px",
              borderRadius: "6px",
            }}
            value={itensData.valorTotal[id] || 0}
            mode="currency"
            currency="BRL"
            locale="pr-BR"
            readOnly
            required
          />
        </div>
      </div>
      <div className="flex flex-row gap-6 justify-start items-center py-2">
        {itensData.categoria[id] == "Venda" ? (
          <div>
            <p>Software:</p>
            <Dropdown
              style={{
                border: "1px solid gray",
                padding: "4px",
                width: "10rem",
              }}
              value={itensData.software[id]}
              onChange={(e) => handleChange("software", e.value)}
              options={["Com Software", "Sem Software"]}
              placeholder="Selecione"
              required
            />
          </div>
        ) : (
          <div>
            <p>Valor Mensal:</p>
            <InputNumber
              style={{ border: "1px solid gray", borderRadius: "6px" }}
              inputStyle={{
                padding: "4px",
                borderRadius: "6px",
              }}
              value={itensData.valorMensal[id]}
              onChange={(e) => handleChange("valorMensal", e.value)}
              mode="currency"
              currency="BRL"
              locale="pr-BR"
              required
            />
          </div>
        )}
        <div>
          <p>Forma de Pagamento:</p>
          <InputText
            style={{ border: "1px solid gray", padding: "4px" }}
            value={itensData.formaPagamento[id]}
            onChange={(e) => handleChange("formaPagamento", e.value)}
            required
          />
        </div>
        <div>
          <p>Vencimento do 1º Boleto:</p>
          <Calendar
            style={{ border: "1px solid gray", borderRadius: "6px" }}
            inputStyle={{
              padding: "4px",
              borderRadius: "6px",
            }}
            value={itensData.vencPrimeiroBoleto[id]}
            onChange={(e) => handleChange("vencPrimeiroBoleto", e.value)}
            required
          />
        </div>
        <div>
          <p>Pagamento:</p>
          <Dropdown
            style={{
              border: "1px solid gray",
              padding: "4px",
              width: "10rem",
            }}
            value={itensData.pagamentoContrato[id]}
            onChange={(e) => handleChange("pagamentoContrato", e.value)}
            options={["Mensal", "Anual"]}
            placeholder="Selecione"
            required
          />
        </div>
        {itensData.categoria[id] == "Contrato" ? (
          <>
            <div>
              <p>Duração:</p>
              <Dropdown
                style={{
                  border: "1px solid gray",
                  padding: "4px",
                  width: "10rem",
                }}
                value={itensData.duracaoContrato[id]}
                onChange={(e) => handleChange("duracaoContrato", e.value)}
                options={["12 meses", "36 meses"]}
                placeholder="Selecione"
                required
              />
            </div>
            <div className="flex flex-row gap-4 bg-blue-200 p-2 rounded">
              <div>
                <p>Vigência (Início):</p>
                <Calendar
                  style={{ border: "1px solid gray", borderRadius: "6px" }}
                  inputStyle={{
                    padding: "4px",
                    borderRadius: "6px",
                  }}
                  value={itensData.vigenciaInicio[id]}
                  onChange={(e) => handleChange("vigenciaInicio", e.value)}
                  required
                />
              </div>
              <div>
                <p>Vigência (Fim):</p>
                <Calendar
                  style={{ border: "1px solid gray", borderRadius: "6px" }}
                  inputStyle={{
                    padding: "4px",
                    borderRadius: "6px",
                  }}
                  value={itensData.vigenciaFim[id]}
                  onChange={(e) => handleChange("vigenciaFim", e.value)}
                  required
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ItemPedido;
