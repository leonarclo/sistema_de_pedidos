package com.leonardo.spring_sistema_de_pedidos.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.leonardo.spring_sistema_de_pedidos.common.Formatters;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
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
        private Long usuarioId;
        private List<ItemPedidoRequestDTO> itens;
        private List<ArquivoDTO> arquivos;

        public PedidoCompletoRequestDTO() {
                this.data = Formatters.currentDateTime();

        }

}
