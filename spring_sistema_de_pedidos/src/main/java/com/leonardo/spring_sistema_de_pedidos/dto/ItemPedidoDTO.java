package com.leonardo.spring_sistema_de_pedidos.dto;

public record ItemPedidoDTO(
        Long id,
        String chave,
        String categoria,
        String produto,
        String preco,
        String quantidade,
        String precoTotal,
        String numeroFuncionarios,
        String valorMensal,
        String formaPagamento,
        String vencimento1Boleto,
        String tipoPagamento,
        String duracaoContrato,
        String vigenciaInicio,
        String vigenciaFim) {
}
