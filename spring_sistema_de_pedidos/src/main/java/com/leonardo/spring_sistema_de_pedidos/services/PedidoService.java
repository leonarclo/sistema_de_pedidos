package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.PedidoMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;

    public PedidoService(PedidoRepository pedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public List<PedidoDTO> findAll() {
        return pedidoRepository.findAllByOrderByIdDesc().stream().map(PedidoMapper::toPedidoDTO)
                .collect(Collectors.toList());
    }

    public PedidoDTO save(PedidoDTO novoPedido) {
        return PedidoMapper.toPedidoDTO(pedidoRepository.save(PedidoMapper.toPedidoEntity(novoPedido)));
    }

    public PedidoDTO update(PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoRepository.findById(pedidoDTO.id())
                .orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada!"));
        pedido.setEmpresa(pedidoDTO.empresa());
        pedido.setConsultor(pedidoDTO.consultor());
        pedido.setCargoCliente(pedidoDTO.cargoCliente());
        pedido.setLeadOrigem(pedidoDTO.leadOrigem());
        pedido.setLeadData(pedidoDTO.leadData());
        pedido.setCnpj(pedidoDTO.cnpj());
        pedido.setEmail(pedidoDTO.email());
        pedido.setStatus(pedidoDTO.status());
        pedido.setTelefone1(pedidoDTO.telefone1());
        pedido.setTelefone2(pedidoDTO.telefone2());
        pedido.setLogradouro(pedidoDTO.logradouro());
        pedido.setNumeroEndereco(pedidoDTO.numeroEndereco());
        pedido.setBairro(pedidoDTO.bairro());
        pedido.setComplemento(pedidoDTO.complemento());
        pedido.setCep(pedidoDTO.cep());
        pedido.setCidade(pedidoDTO.cidade());
        pedido.setEstado(pedidoDTO.estado());
        pedido.setTransportadora(pedidoDTO.transportadora());
        pedido.setFretePreco(pedidoDTO.fretePreco());
        pedido.setNomeCliente(pedidoDTO.nomeCliente());
        pedido.setCpfCliente(pedidoDTO.cpfCliente());
        pedido.setCategoriaGrupo(pedidoDTO.categoriaGrupo());
        pedido.setObservacoes(pedidoDTO.observacoes());
        pedido.setEmailLogin(pedidoDTO.emailLogin());

        Pedido novoPedido = pedidoRepository.save(pedido);
        return PedidoMapper.toPedidoDTO(novoPedido);
    }
}
