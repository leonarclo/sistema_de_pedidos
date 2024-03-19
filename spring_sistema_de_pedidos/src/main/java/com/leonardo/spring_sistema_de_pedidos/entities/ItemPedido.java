package com.leonardo.spring_sistema_de_pedidos.entities;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.hibernate.envers.Audited;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.leonardo.spring_sistema_de_pedidos.common.Formatters;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Audited
@JsonIgnoreProperties(value = { "hibernateLazyInitializer", "handler" }, ignoreUnknown = true)
@EntityListeners(AuditingEntityListener.class)
@Table(name = "co_itens")
public class ItemPedido implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "venc_1_boleto")
    private String vencimento1Boleto;

    @Column(name = "pagamentotipo")
    private String tipoPagamento;

    @Column(name = "duracao")
    private String duracaoContrato;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "vigenciain")
    private String vigenciaInicio;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "vigenciaout")
    private String vigenciaFim;

    @CreatedBy
    @Column(name = "criado_por", length = 50)
    private String criadoPor;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @LastModifiedBy
    @Column(name = "editado_por", length = 50)
    private String editadoPor;

    @LastModifiedDate
    @Column(name = "editado_em")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime editadoEm;

    public ItemPedido() {
        if (this.chave == null || this.chave.isEmpty()) {
            this.chave = Formatters.generateChave();
        }
    }
}
