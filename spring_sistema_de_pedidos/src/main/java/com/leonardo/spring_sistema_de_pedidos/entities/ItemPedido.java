package com.leonardo.spring_sistema_de_pedidos.entities;

import org.hibernate.envers.Audited;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.leonardo.spring_sistema_de_pedidos.common.Formatters;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@Audited
@EntityListeners(AuditingEntityListener.class)
@Table(name = "co_itens")
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "pedido_id", referencedColumnName = "id")
    private Pedido pedido;

    @Column(name = "chaveb", updatable = false)
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

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "venc_1_boleto")
    private String vencimento1Boleto;

    @Column(name = "pagamentotipo")
    private String tipoPagamento;

    @Column(name = "duracao")
    private String duracaoContrato;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "vigenciain")
    private String vigenciaInicio;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "vigenciaout")
    private String vigenciaFim;

    public ItemPedido() {
        this.chave = Formatters.generateChave();
    }
}
