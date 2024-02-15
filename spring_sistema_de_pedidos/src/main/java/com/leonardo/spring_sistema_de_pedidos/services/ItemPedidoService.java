package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.ItemPedidoMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ItemPedidoService {

    private final ItemPedidoRepository itemPedidoRepository;

    public ItemPedidoService(ItemPedidoRepository itemPedidoRepository) {
        this.itemPedidoRepository = itemPedidoRepository;

    }

    public List<ItemPedidoDTO> save(List<ItemPedidoDTO> itemPedidoDTO) {
        List<ItemPedido> itemPedido = itemPedidoDTO.stream()
                .map(ItemPedidoMapper::toItemPedidoEntity)
                .collect(Collectors.toList());

        List<ItemPedido> savedEntities = itemPedidoRepository.saveAll(itemPedido);

        return savedEntities.stream()
                .map(ItemPedidoMapper::toItemPedidoDTO)
                .collect(Collectors.toList());
    }

    public List<ItemPedidoDTO> findAll() {
        return itemPedidoRepository.findAllByOrderByIdDesc().stream()
                .map(ItemPedidoMapper::toItemPedidoDTO).collect(Collectors.toList());
    }

    public List<ItemPedidoDTO> findByChave(String chave) {
        return itemPedidoRepository.findAllByChave(chave).stream()
                .map(ItemPedidoMapper::toItemPedidoDTO)
                .collect(Collectors.toList());
    }

    public ItemPedidoDTO update(ItemPedidoDTO itemPedidoDTO) {
        ItemPedido itemPedido = itemPedidoRepository.findById(itemPedidoDTO.id())
                .orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada!"));
        itemPedido.setChave(itemPedidoDTO.chave());
        itemPedido.setCategoria(itemPedidoDTO.categoria());
        itemPedido.setProduto(itemPedidoDTO.produto());
        itemPedido.setPreco(itemPedidoDTO.preco());
        itemPedido.setQuantidade(itemPedidoDTO.quantidade());
        itemPedido.setPrecoTotal(itemPedidoDTO.precoTotal());
        itemPedido.setNumeroFuncionarios(itemPedidoDTO.numeroFuncionarios());
        itemPedido.setValorMensal(itemPedidoDTO.valorMensal());
        itemPedido.setFormaPagamento(itemPedidoDTO.formaPagamento());
        itemPedido.setVencimento1Boleto(itemPedidoDTO.vencimento1Boleto());
        itemPedido.setTipoPagamento(itemPedidoDTO.tipoPagamento());
        itemPedido.setDuracaoContrato(itemPedidoDTO.duracaoContrato());
        itemPedido.setVigenciaInicio(itemPedidoDTO.vigenciaInicio());
        itemPedido.setVigenciaFim(itemPedidoDTO.vigenciaFim());

        ItemPedido novoItem = itemPedidoRepository.save(itemPedido);
        return ItemPedidoMapper.toItemPedidoDTO(novoItem);
    }
}
