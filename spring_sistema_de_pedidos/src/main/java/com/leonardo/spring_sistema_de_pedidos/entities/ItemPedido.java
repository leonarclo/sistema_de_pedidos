package com.leonardo.spring_sistema_de_pedidos.entities;

import org.springframework.format.annotation.DateTimeFormat;

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
@Table(name = "co_itens")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "chaveb")
    private String chave;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "produto")
    private String produto;

    @Column(name = "preco")
    private String preco;

    @Column(name = "qtde")
    private String quantidade;

    @Column(name = "precototal")
    private String precoTotal;

    @Column(name = "nFuncionarios")
    private String numeroFuncionarios;

    @Column(name = "valor_mensal")
    private String valorMensal;

    @Column(name = "forma_pgto")
    private String formaPagamento;

    @Column(name = "venc_1_boleto")
    private String vencimento1Boleto;

    @Column(name = "pagamentotipo")
    private String tipoPagamento;

    @Column(name = "duracao")
    private String duracaoContrato;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "vigenciain")
    private String vigenciaInicio;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "vigenciaout")
    private String vigenciaFim;
}
