package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import org.springframework.stereotype.Service;
import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.ItemPedidoMapper;
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;

@Service
public class ItemPedidoService {

    private final ItemPedidoRepository itemPedidoRepository;

    public ItemPedidoService(ItemPedidoRepository itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;

    }

    public List<ItemPedidoResponseDTO> findAll() {
        return ItemPedidoMapper.toItemPedidoList(itemPedidoRepository.findAllByOrderByIdDesc());
    }

    public List<ItemPedidoResponseDTO> findByChave(String chave) {
        return ItemPedidoMapper.toItemPedidoList(itemPedidoRepository.findAllByChave(chave));
    }
}
