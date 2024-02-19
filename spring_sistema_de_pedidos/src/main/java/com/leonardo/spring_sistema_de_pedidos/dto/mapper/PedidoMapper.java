package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.SaveAndUpdatePedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;

public class PedidoMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static PedidoResponseDTO toPedidoResponse(Pedido pedido) {
        return modelMapper.map(pedido, PedidoResponseDTO.class);
    }

    public static List<PedidoResponseDTO> toPedidoList(List<Pedido> pedidos) {
        return pedidos.stream().map(pedido -> toPedidoResponse(pedido)).collect(Collectors.toList());
    }

    public static Pedido toPedidoCompletoResponse(SaveAndUpdatePedidoDTO pedido) {
        return modelMapper.map(pedido, Pedido.class);
    }

    public static SaveAndUpdatePedidoDTO toUpdate(Pedido pedido) {
        List<ItemPedidoResponseDTO> itens = pedido.getItens().stream()
                .map(item -> modelMapper.map(item, ItemPedidoResponseDTO.class))
                .collect(Collectors.toList());
        SaveAndUpdatePedidoDTO pedidoAtualizado = new SaveAndUpdatePedidoDTO();
        pedidoAtualizado.setItens(itens);
        return pedidoAtualizado;
    }
}
