package com.leonardo.spring_sistema_de_pedidos.entities;

import java.io.Serializable;
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

    @Column(name = "transportadora")
    private String transportadora = "";

    @Column(name = "frete")
    private String fretePreco = "";

    @Column(name = "responsavel_nome")
    private String nomeCliente;

    @Column(name = "responsavel_cpf")
    private String cpfCliente;

    @Column(name = "catgrupo")
    private String categoriaGrupo;

    @Column(name = "categoria")
    private String categoria = "";

    @Column(name = "produto")
    private String produto = "";

    @Column(name = "preco")
    private String preco = "";

    @Column(name = "qtde")
    private String qtde = "";

    @Column(name = "precototal")
    private String precoTotal = "";

    @Column(name = "nfuncionarios")
    private String nFuncionarios = "";

    @Column(name = "valor_mensal")
    private String valorMensal = "";

    @Column(name = "forma_pgto")
    private String formaPagamento = "";

    @Column(name = "venc_1_boleto")
    private String venc1Boleto = "";

    @Column(name = "pagamentotipo")
    private String pagamentoTipo = "";

    @Column(name = "duracao")
    private String duracao = "";

    @Column(name = "vigenciain")
    private String vigenciaIn = "";

    @Column(name = "vigenciaout")
    private String vigenciaOut = "";

    @Column(name = "planilhavendas")
    private String planilhaVendas = "";

    @Column(name = "licencagerada")
    private Integer licencaGerada = 0;

    @Column(name = "assinatura")
    private Integer assinatura;

    @Column(name = "chat")
    private Integer chat = 0;

    @Column(name = "posvenda")
    private Integer posVenda = 0;

    @Column(name = "notafiscal")
    private String notaFiscal = "";

    @Column(name = "unidadenegocio")
    private String unidadeNegocio = "";

    @Column(name = "previsaoentrega")
    private String previsaoEntrega = "";

    @Column(name = "numeroserie")
    private String numeroSerie = "";

    @Column(name = "codigorastreio")
    private String codigoRastreio = "";

    @Column(name = "obs")
    private String observacoes = "";

    @Column(name = "emaillogin")
    private String emailLogin = "";
}
