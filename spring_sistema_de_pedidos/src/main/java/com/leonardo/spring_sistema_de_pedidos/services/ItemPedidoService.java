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

    public List<ItemPedidoDTO> update(List<ItemPedidoDTO> itemPedidoDTOs) {
        List<ItemPedido> itemPedidos = itemPedidoDTOs.stream()
                .map(itemPedidoDTO -> itemPedidoRepository.findById(itemPedidoDTO.id())
                        .map(existItemPedido -> {
                            existItemPedido.setCategoria(itemPedidoDTO.categoria());
                            existItemPedido.setProduto(itemPedidoDTO.produto());
                            existItemPedido.setPreco(itemPedidoDTO.preco());
                            existItemPedido.setQuantidade(itemPedidoDTO.quantidade());
                            existItemPedido.setPrecoTotal(itemPedidoDTO.precoTotal());
                            if (itemPedidoDTO.numeroFuncionarios() != null) {
                                existItemPedido.setNumeroFuncionarios(itemPedidoDTO.numeroFuncionarios());
                            }
                            existItemPedido.setValorMensal(itemPedidoDTO.valorMensal());
                            existItemPedido.setFormaPagamento(itemPedidoDTO.formaPagamento());
                            existItemPedido.setVencimento1Boleto(itemPedidoDTO.vencimento1Boleto());
                            existItemPedido.setTipoPagamento(itemPedidoDTO.tipoPagamento());
                            if (itemPedidoDTO.duracaoContrato() != null) {
                                existItemPedido.setDuracaoContrato(itemPedidoDTO.duracaoContrato());
                            }
                            if (itemPedidoDTO.vigenciaInicio() != null) {
                                existItemPedido.setVigenciaInicio(itemPedidoDTO.vigenciaInicio());
                            }
                            if (itemPedidoDTO.vigenciaFim() != null) {
                                existItemPedido.setVigenciaFim(itemPedidoDTO.vigenciaFim());
                            }
                            return existItemPedido;
                        })
                        .orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada!")))
                .collect(Collectors.toList());

        List<ItemPedido> novoItem = itemPedidoRepository.saveAll(itemPedidos);
        return novoItem.stream().map(ItemPedidoMapper::toItemPedidoDTO).collect(Collectors.toList());
    }
}
