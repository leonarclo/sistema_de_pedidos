package com.leonardo.spring_sistema_de_pedidos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ItemPedidoRequestDTO {
    private String categoria;
    private String produto;
    private String preco;
    private String quantidade;
    private String precoTotal;
    private String numeroFuncionarios;
    private String valorMensal;
    private String formaPagamento;
    private String vencimento1Boleto;
    private String tipoPagamento;
    private String duracaoContrato;
    private String vigenciaInicio;
    private String vigenciaFim;

    public ItemPedidoRequestDTO() {
        this.numeroFuncionarios = numeroFuncionarios != null ? numeroFuncionarios : "";
        this.valorMensal = valorMensal != null ? valorMensal : "";
        this.tipoPagamento = tipoPagamento != null ? tipoPagamento : "";
        this.duracaoContrato = duracaoContrato != null ? duracaoContrato : "";
        this.vigenciaInicio = vigenciaInicio != null ? vigenciaInicio : "";
        this.vigenciaFim = vigenciaFim != null ? vigenciaFim : "";
    }
}
