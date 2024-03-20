package com.leonardo.spring_sistema_de_pedidos.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioRequestDTO {
    @NotBlank(message = "Usuário não pode estar em branco")
    private String usuario;
    @NotBlank(message = "Nome não pode estar em branco")
    private String nomeCompleto;
    @NotBlank(message = "Departamento não pode estar em branco")
    private String departamento;
    @Email(message = "Email inválido")
    private String email;
    @Nullable
    @Size(min = 5, message = "Senha precisa conter no mínimo 5 caracteres")
    private String password;
    @NotBlank(message = "Nível não pode estar em branco")
    private Integer nivel;
}
