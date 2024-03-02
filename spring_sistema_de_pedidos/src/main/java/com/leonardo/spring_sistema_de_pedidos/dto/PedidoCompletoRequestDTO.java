package com.leonardo.spring_sistema_de_pedidos.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;

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
        private Usuario criadoPor;
        private Usuario editadoPor;
        private LocalDateTime editadoEm;
        private List<ItemPedidoRequestDTO> itens;

        public PedidoCompletoRequestDTO() {
                this.data = getCurrentDateTimeAsString();
        }

        private static String getCurrentDateTimeAsString() {
                LocalDateTime currentDateTime = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                return currentDateTime.format(formatter);
        }

}
