package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.PedidoMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.payload.PedidoRequest;
import com.leonardo.spring_sistema_de_pedidos.payload.PedidoResponse;
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;
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

    public Pedido save(PedidoRequest novoPedido) {
        Pedido pedido = new Pedido();
        pedido.setChave(novoPedido.chave());
        pedido.setData(novoPedido.data());
        pedido.setEmpresa(novoPedido.empresa());
        pedido.setConsultor(novoPedido.consultor());
        pedido.setCargoCliente(novoPedido.cargoCliente());
        pedido.setLeadOrigem(novoPedido.leadOrigem());
        pedido.setLeadData(novoPedido.leadData());
        pedido.setCnpj(novoPedido.cnpj());
        pedido.setEmail(novoPedido.email());
        pedido.setStatus(novoPedido.status());
        pedido.setTelefone1(novoPedido.telefone1());
        pedido.setTelefone2(novoPedido.telefone2());
        pedido.setLogradouro(novoPedido.logradouro());
        pedido.setNumeroEndereco(novoPedido.numeroEndereco());
        pedido.setBairro(novoPedido.bairro());
        pedido.setComplemento(novoPedido.complemento());
        pedido.setCep(novoPedido.cep());
        pedido.setCidade(novoPedido.cidade());
        pedido.setEstado(novoPedido.estado());
        pedido.setTransportadora(novoPedido.transportadora());
        pedido.setFretePreco(novoPedido.fretePreco());
        pedido.setNomeCliente(novoPedido.nomeCliente());
        pedido.setCpfCliente(novoPedido.cpfCliente());
        pedido.setCategoriaGrupo(novoPedido.categoriaGrupo());
        pedido.setObservacoes(novoPedido.observacoes());
        pedido.setEmailLogin(novoPedido.emailLogin());
        return pedidoRepository.save(pedido);
    }

    public PedidoDTO update(PedidoDTO pedidoDTO) {
        Pedido pedido = pedidoRepository.findById(pedidoDTO.id())
                .orElseThrow(() -> new EntityNotFoundException("Entidade não encontrada!"));
        pedido.setChave(pedidoDTO.chave());
        pedido.setData(pedidoDTO.data());
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
