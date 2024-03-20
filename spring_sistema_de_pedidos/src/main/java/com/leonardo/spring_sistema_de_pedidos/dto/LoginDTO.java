package com.leonardo.spring_sistema_de_pedidos.dto;

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
public class LoginDTO {
    @NotBlank(message = "Usuário não pode estar em branco")
    private String usuario;
    @Size(min = 5, message = "Senha precisa conter no mínimo 5 caracteres")
    private String password;
}
