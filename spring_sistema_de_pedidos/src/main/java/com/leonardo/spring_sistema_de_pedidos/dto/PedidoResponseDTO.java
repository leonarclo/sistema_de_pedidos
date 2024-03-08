package com.leonardo.spring_sistema_de_pedidos.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PedidoResponseDTO {
        private Long id;
        private String chave;
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
        private String categoria;
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
        private LocalDateTime editadoEm;
        private UsuarioResponseDTO editadoPor;
        private UsuarioResponseDTO criadoPor;
}
