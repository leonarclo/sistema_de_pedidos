package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;

public class ItemPedidoMapper {

    public static ItemPedidoDTO toItemPedidoDTO(ItemPedido itemPedido) {
        return new ItemPedidoDTO(itemPedido.getId(), itemPedido.getChave(), itemPedido.getCategoria(),
                itemPedido.getProduto(),
                itemPedido.getPreco(), itemPedido.getQuantidade(), itemPedido.getPrecoTotal(),
                itemPedido.getNumeroFuncionarios(), itemPedido.getValorMensal(), itemPedido.getFormaPagamento(),
                itemPedido.getVencimento1Boleto(), itemPedido.getTipoPagamento(), itemPedido.getDuracaoContrato(),
                itemPedido.getVigenciaInicio(), itemPedido.getVigenciaFim());
    }

    public static ItemPedido toItemPedidoEntity(ItemPedidoDTO itemPedidoDTO) {
        ItemPedido itemPedido = new ItemPedido();
        itemPedido.setChave(itemPedidoDTO.chave());
        itemPedido.setCategoria(itemPedidoDTO.categoria());
        itemPedido.setProduto(itemPedidoDTO.produto());
        itemPedido.setPreco(itemPedidoDTO.preco());
        itemPedido.setQuantidade(itemPedidoDTO.quantidade());
        itemPedido.setPrecoTotal(itemPedidoDTO.precoTotal());
        itemPedido.setNumeroFuncionarios(
                itemPedidoDTO.numeroFuncionarios() != null ? itemPedidoDTO.numeroFuncionarios() : "");
        itemPedido.setValorMensal(itemPedidoDTO.valorMensal() != null ? itemPedidoDTO.valorMensal() : "");
        itemPedido.setFormaPagamento(itemPedidoDTO.formaPagamento());
        itemPedido.setVencimento1Boleto(itemPedidoDTO.vencimento1Boleto());
        itemPedido.setTipoPagamento(itemPedidoDTO.tipoPagamento());
        itemPedido.setDuracaoContrato(itemPedidoDTO.duracaoContrato() != null ? itemPedidoDTO.duracaoContrato()
                : "");
        itemPedido.setVigenciaInicio(itemPedidoDTO.vigenciaInicio() != null ? itemPedidoDTO.vigenciaInicio() : "");
        itemPedido.setVigenciaFim(itemPedidoDTO.vigenciaFim() != null ? itemPedidoDTO.vigenciaFim() : "");
        return itemPedido;
    }
}
