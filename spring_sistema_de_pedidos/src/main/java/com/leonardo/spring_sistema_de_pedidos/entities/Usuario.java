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
@Table(name = "co_acesso")
public class Usuario implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String usuario;

    @Column(name = "fullname")
    private String nomeCompleto;

    @Column(name = "departamento")
    private String departamento;

    @Column(name = "secretpin")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "adm")
    private Integer nivel;

    @Column(name = "fator")
    private Integer fator;
}
