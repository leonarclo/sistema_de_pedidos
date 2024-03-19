package com.leonardo.spring_sistema_de_pedidos.entities;

import java.io.Serializable;
import java.time.LocalDate;
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
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@AllArgsConstructor
@Audited
@ToString(callSuper = true)
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@EntityListeners(AuditingEntityListener.class)
@Table(name = "co_arquivos")
public class Arquivo implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "chavec", updatable = false)
    private String chave;

    @Column(name = "arqnome")
    private String arquivo;

    @Column(name = "url", nullable = true)
    private String url;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "pedido_id", referencedColumnName = "id", nullable = true)
    private Pedido pedido;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Column(name = "criado_em")
    private LocalDateTime criadoEm;

    @CreatedBy
    @Column(name = "criado_por", length = 50)
    private String criadoPor;

    @LastModifiedDate
    @Column(name = "editado_em")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime editadoEm;

    @LastModifiedBy
    @Column(name = "editado_por", length = 50)
    private String editadoPor;

    public Arquivo() {
        this.chave = Formatters.generateChave();
    }
}
