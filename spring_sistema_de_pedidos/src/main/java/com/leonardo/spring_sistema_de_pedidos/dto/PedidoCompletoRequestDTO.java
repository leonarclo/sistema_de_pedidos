package com.leonardo.spring_sistema_de_pedidos.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PedidoCompletoRequestDTO {
        private String data;
        private String empresa;
        private String consultor;
        private String cargoCliente;
        private String leadOrigem;
        private String leadData;
        private String cnpj;
        private String email;
        private String status;
        private String telefone1;
        private String telefone2;
        private String logradouro;
        private String numeroEndereco;
        private String bairro;
        private String complemento;
        private String cep;
        private String cidade;
        private String estado;
        private String transportadora;
        private String fretePreco;
        private String nomeCliente;
        private String cpfCliente;
        private String categoriaGrupo;
        private String planilhaVendas;
        private Integer licencaGerada;
        private Integer assinatura;
        private Integer chat;
        private Integer posVenda;
        private String notaFiscal;
        private String unidadeNegocio;
        private String previsaoEntrega;
        private String numeroSerie;
        private String codigoRastreio;
        private String observacoes;
        private String emailLogin;
        private List<ItemPedidoRequestDTO> itens;

        public PedidoCompletoRequestDTO() {
                this.data = getCurrentDateTimeAsString();
                this.telefone2 = telefone2 != null ? telefone2 : "";
                this.complemento = complemento != null ? complemento : "";
                this.transportadora = transportadora != null ? transportadora : "";
                this.fretePreco = fretePreco != null ? fretePreco : "";
                this.planilhaVendas = planilhaVendas != null ? planilhaVendas : "";
                this.licencaGerada = licencaGerada != null ? licencaGerada : 0;
                this.assinatura = assinatura != null ? assinatura : 0;
                this.chat = chat != null ? chat : 0;
                this.posVenda = posVenda != null ? posVenda : 0;
                this.notaFiscal = notaFiscal != null ? notaFiscal : "";
                this.unidadeNegocio = unidadeNegocio != null ? unidadeNegocio : "";
                this.previsaoEntrega = previsaoEntrega != null ? previsaoEntrega : "";
                this.numeroSerie = numeroSerie != null ? numeroSerie : "";
                this.codigoRastreio = codigoRastreio != null ? codigoRastreio : "";
                this.observacoes = observacoes != null ? observacoes : "";
                this.emailLogin = emailLogin != null ? emailLogin : "";
        }

        private static String getCurrentDateTimeAsString() {
                LocalDateTime currentDateTime = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                return currentDateTime.format(formatter);
        }
}
