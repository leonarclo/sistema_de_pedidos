package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.SaveAndUpdatePedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.PedidoMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;

import jakarta.transaction.Transactional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
    }

    public List<PedidoResponseDTO> findAll() {
        return PedidoMapper.toPedidoList(pedidoRepository.findAllByOrderByIdDesc());
    }

    @Transactional
    public SaveAndUpdatePedidoDTO save(SaveAndUpdatePedidoDTO pedidoCompleto) {
        Pedido pedido = PedidoMapper.toPedidoCompletoResponse(pedidoCompleto);

        for (ItemPedido itemPedido : pedido.getItens()) {
            itemPedido.setPedido(pedido);
            itemPedidoRepository.save(itemPedido);
        }

        pedidoRepository.save(pedido);
        return PedidoMapper.toUpdate(pedido);
    }

    @Transactional
    public SaveAndUpdatePedidoDTO update(SaveAndUpdatePedidoDTO updatePedido, Long id) {
        ModelMapper modelMapper = new ModelMapper();
        Pedido findPedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));

        modelMapper.map(updatePedido, findPedido);

        List<ItemPedido> itens = updatePedido.getItens().stream()
                .map(itemDto -> {
                    ItemPedido item = modelMapper.map(itemDto, ItemPedido.class);
                    item.setPedido(findPedido);
                    return item;
                })
                .collect(Collectors.toList());

        findPedido.setItens(itens);
        pedidoRepository.save(findPedido);
        return PedidoMapper.toUpdate(findPedido);
    }
}
