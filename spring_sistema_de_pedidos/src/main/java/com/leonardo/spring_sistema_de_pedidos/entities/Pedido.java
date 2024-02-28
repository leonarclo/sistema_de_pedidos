package com.leonardo.spring_sistema_de_pedidos.entities;

import java.io.Serializable;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreUpdate;
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
    private String transportadora;

    @Column(name = "frete")
    private String fretePreco;

    @Column(name = "responsavel_nome")
    private String nomeCliente;

    @Column(name = "responsavel_cpf")
    private String cpfCliente;

    @Column(name = "catgrupo")
    private String categoriaGrupo;

    @Column(name = "planilhavendas")
    private String planilhaVendas;

    @Column(name = "licencagerada")
    private Integer licencaGerada;

    @Column(name = "assinatura")
    private Integer assinatura;

    @Column(name = "chat")
    private Integer chat;

    @Column(name = "posvenda")
    private Integer posVenda;

    @Column(name = "notafiscal")
    private String notaFiscal;

    @Column(name = "unidadenegocio")
    private String unidadeNegocio;

    @Column(name = "previsaoentrega")
    private String previsaoEntrega;

    @Column(name = "numeroserie")
    private String numeroSerie;

    @Column(name = "codigorastreio")
    private String codigoRastreio;

    @Column(name = "obs")
    private String observacoes;

    @Column(name = "emaillogin")
    private String emailLogin;

    @Column(name = "consultor_id", nullable = true)
    private Long consultorId;

    @UpdateTimestamp
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "editado_em", nullable = true)
    private LocalDateTime editadoEm;

    @Column(name = "editado_por", nullable = true)
    private Long editadoPor;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL)
    private List<ItemPedido> itens;

    public Pedido() {
        this.chave = generateChave();
    }

    private static String generateChave() {
        String patternChave = "yyMMddHHmmss";
        DateFormat fmtChave = new SimpleDateFormat(patternChave);
        Date today = Calendar.getInstance().getTime();
        return fmtChave.format(today);
    }
}
