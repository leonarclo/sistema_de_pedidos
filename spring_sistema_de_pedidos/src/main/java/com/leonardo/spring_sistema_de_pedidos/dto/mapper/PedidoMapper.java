package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoCompletoRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;

public class PedidoMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static PedidoResponseDTO toPedidoResponse(Pedido pedido) {
        return modelMapper.map(pedido, PedidoResponseDTO.class);
    }

    public static List<PedidoResponseDTO> toPedidoList(List<Pedido> pedidos) {
        return pedidos.stream().map(pedido -> toPedidoResponse(pedido)).collect(Collectors.toList());
    }

    public static Pedido toPedidoCompletoResponse(PedidoCompletoRequestDTO pedido) {
        return modelMapper.map(pedido, Pedido.class);
    }

    public static PedidoCompletoRequestDTO toUpdate(Pedido pedido) {
        List<ItemPedidoRequestDTO> itens = pedido.getItens().stream()
                .map(item -> modelMapper.map(item, ItemPedidoRequestDTO.class))
                .collect(Collectors.toList());
        PedidoCompletoRequestDTO pedidoAtualizado = new PedidoCompletoRequestDTO();
        pedidoAtualizado.setItens(itens);
        return pedidoAtualizado;
    }
}
