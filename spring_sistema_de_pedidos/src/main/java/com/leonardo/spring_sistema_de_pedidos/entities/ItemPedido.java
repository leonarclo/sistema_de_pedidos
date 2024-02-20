package com.leonardo.spring_sistema_de_pedidos.entities;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "co_itens")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", referencedColumnName = "id")
    private Pedido pedido;

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

    @Column(name = "nfuncionarios")
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

    @Column(name = "vigenciain")
    private String vigenciaInicio;

    @Column(name = "vigenciaout")
    private String vigenciaFim;

    public ItemPedido() {
        this.chave = generateChave();
    }

    private String generateChave() {
        LocalDateTime now = LocalDateTime.now();
        return now.format(DateTimeFormatter.ofPattern("yyMMddHHmmss"));
    }
}
