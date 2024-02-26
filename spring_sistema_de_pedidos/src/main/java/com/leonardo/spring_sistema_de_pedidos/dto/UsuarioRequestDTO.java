package com.leonardo.spring_sistema_de_pedidos.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UsuarioRequestDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private String usuario;
    private String nomeCompleto;
    private String departamento;
    private String email;
    private String password;
    private Integer nivel;
}