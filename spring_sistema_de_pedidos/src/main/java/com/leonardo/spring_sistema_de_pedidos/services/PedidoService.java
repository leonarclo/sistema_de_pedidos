package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoCompletoRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.PedidoMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
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

    public List<PedidoResponseDTO> findByConsultor(String consultor, Integer consultorId) {
        return PedidoMapper.toPedidoList(pedidoRepository.findByConsultorOrUsuario_id(consultor, consultorId));
    }

    @Transactional
    public PedidoCompletoRequestDTO save(PedidoCompletoRequestDTO pedidoCompleto) {
        Pedido pedido = PedidoMapper.toPedidoCompletoResponse(pedidoCompleto);
        Usuario usuario = pedidoCompleto.getUsuario();
        pedido.setUsuario(usuario);

        for (ItemPedido itemPedido : pedido.getItens()) {
            itemPedido.setPedido(pedido);
            itemPedidoRepository.save(itemPedido);
        }

        pedidoRepository.save(pedido);
        return PedidoMapper.toUpdate(pedido);
    }

    @Transactional
    public PedidoCompletoRequestDTO update(PedidoCompletoRequestDTO updatePedido, @NonNull Long id,
            @NonNull Long itemId) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.getConfiguration().setSkipNullEnabled(true);

        Pedido findPedido = pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));

        modelMapper.map(updatePedido, findPedido);
        for (ItemPedidoRequestDTO itemPedidoDto : updatePedido.getItens()) {
            Optional<ItemPedido> optionalItemPedido = findPedido.getItens().stream()
                    .filter(itemPedido -> Objects.equals(itemPedido.getId(), itemId))
                    .findFirst();

            if (optionalItemPedido.isPresent()) {
                ItemPedido itemPedido = optionalItemPedido.get();
                // Atualizar os campos do item existente
                modelMapper.map(itemPedidoDto, itemPedido);
                itemPedido.setPedido(findPedido);
                itemPedidoRepository.save(itemPedido);
            }
        }

        pedidoRepository.save(findPedido);

        return PedidoMapper.toUpdate(findPedido);
    }

}
