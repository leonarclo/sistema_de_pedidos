package com.leonardo.spring_sistema_de_pedidos.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequestDTO {
    private String usuario;
    private String nomeCompleto;
    private String departamento;
    private String email;
    private String password;
    private Integer nivel;
}
