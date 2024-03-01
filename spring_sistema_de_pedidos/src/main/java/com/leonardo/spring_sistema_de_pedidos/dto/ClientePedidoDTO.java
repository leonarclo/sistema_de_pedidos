package com.leonardo.spring_sistema_de_pedidos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ClientePedidoDTO {
    private String empresa;
    private String cargoCliente;
    private String cnpj;
    private String email;
    private String telefone1;
    private String telefone2;
    private String logradouro;
    private String numeroEndereco;
    private String bairro;
    private String complemento;
    private String cep;
    private String cidade;
    private String estado;
    private String transportadora;
    private String fretePreco;
    private String nomeCliente;
    private String cpfCliente;
}
