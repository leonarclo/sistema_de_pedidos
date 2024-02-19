package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;

public class ItemPedidoMapper {

    private static final ModelMapper modelMapper = new ModelMapper();

    public static ItemPedidoResponseDTO toItemPedidoResponse(ItemPedido itemPedido) {
        return modelMapper.map(itemPedido, ItemPedidoResponseDTO.class);
    }

    public static List<ItemPedidoResponseDTO> toItemPedidoList(List<ItemPedido> itens) {
        return itens.stream().map(item -> toItemPedidoResponse(item)).collect(Collectors.toList());
    }
}
