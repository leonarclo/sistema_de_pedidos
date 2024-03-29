package com.leonardo.spring_sistema_de_pedidos.dto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UsuarioResponseDTO {

    private Long id;
    private String usuario;
    private String nomeCompleto;
    private String departamento;
    private String email;
    private Integer nivel;
}