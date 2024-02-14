package com.leonardo.spring_sistema_de_pedidos.entities;

import java.io.Serializable;

import io.micrometer.common.lang.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "co_pedidos")
public class Pedido implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "chave")
    private String chave;

    @Column(name = "data")
    private String data;

    @Column(name = "empresa")
    private String empresa;

    @Column(name = "consultor")
    private String consultor;

    @Column(name = "fechado")
    private String cargoCliente;

    @Column(name = "lead_origem")
    private String leadOrigem;

    @Column(name = "lead_data")
    private String leadData;

    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private String status;

    @Column(name = "fone1")
    private String telefone1;

    @Nullable
    @Column(name = "fone2")
    private String telefone2;

    @Column(name = "rua")
    private String logradouro;

    @Column(name = "numero")
    private String numeroEndereco;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "complemento")
    private String complemento;

    @Column(name = "cep")
    private String cep;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "uf")
    private String estado;

    @Nullable
    @Column(name = "transportadora")
    private String transportadora;

    @Nullable
    @Column(name = "frete")
    private String fretePreco;

    @Column(name = "responsavel_nome")
    private String nomeCliente;

    @Column(name = "responsavel_cpf")
    private String cpfCliente;

    @Nullable
    @Column(name = "catgrupo")
    private String categoriaGrupo;

    @Nullable
    @Column(name = "planilhavendas")
    private String planilhaVendas;

    @Nullable
    @Column(name = "licencagerada")
    private Integer licencaGerada;

    @Nullable
    @Column(name = "assinatura")
    private Integer assinatura;

    @Nullable
    @Column(name = "chat")
    private Integer chat;

    @Nullable
    @Column(name = "posvenda")
    private Integer posVenda;

    @Nullable
    @Column(name = "notafiscal")
    private String notaFiscal;

    @Nullable
    @Column(name = "unidadenegocio")
    private String unidadeNegocio;

    @Nullable
    @Column(name = "previsaoentrega")
    private String previsaoEntrega;

    @Nullable
    @Column(name = "numeroserie")
    private String numeroSerie;

    @Nullable
    @Column(name = "codigorastreio")
    private String codigoRastreio;

    @Nullable
    @Column(name = "obs")
    private String observacoes;

    @Nullable
    @Column(name = "emaillogin")
    private String emailLogin;
}
