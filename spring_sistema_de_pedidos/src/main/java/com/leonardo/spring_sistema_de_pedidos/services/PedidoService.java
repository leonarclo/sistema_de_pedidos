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
import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;
import com.leonardo.spring_sistema_de_pedidos.entities.ItemPedido;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;
import com.leonardo.spring_sistema_de_pedidos.repositories.ArquivoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import jakarta.transaction.Transactional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final ArquivoRepository arquivoRepository;

    private static final ModelMapper modelMapper = new ModelMapper();

    public PedidoService(PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository,
            ArquivoRepository arquivoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.arquivoRepository = arquivoRepository;
    }

    public List<PedidoResponseDTO> findAll() {
        return PedidoMapper.toPedidoList(pedidoRepository.findAllByOrderByIdDesc());
    }

    public List<PedidoResponseDTO> findByCnpj(String cnpj) {
        return PedidoMapper.toPedidoList(pedidoRepository.findFirstByCnpj(cnpj));
    }

    public List<PedidoResponseDTO> findByConsultor(Long usuarioId) {
        return PedidoMapper
                .toPedidoList(pedidoRepository.findByUsuarioIdOrderByIdDesc(usuarioId));
    }

    @Transactional
    public PedidoCompletoRequestDTO save(PedidoCompletoRequestDTO pedidoCompleto, @NonNull Long usuarioId) {
        Pedido pedido = PedidoMapper.toPedidoCompletoResponse(pedidoCompleto);

        for (ItemPedido itemPedido : pedido.getItens()) {
            itemPedido.setPedido(pedido);
            itemPedidoRepository.save(itemPedido);
        }

        for (Arquivo arquivo : pedido.getArquivos()) {
            arquivo.setPedido(pedido);
            arquivoRepository.save(arquivo);
        }

        modelMapper.map(pedidoCompleto, pedido);
        pedido.setUsuarioId(usuarioId);
        pedidoRepository.save(pedido);
        return PedidoMapper.toUpdate(pedido);
    }

    @Transactional
    public PedidoCompletoRequestDTO update(PedidoCompletoRequestDTO updatePedido, @NonNull Long usuarioId,
            @NonNull Long id,
            @NonNull Long itemId) {
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
                itemPedido.setPedido(findPedido);

                modelMapper.map(itemPedidoDto, itemPedido);
                itemPedidoRepository.save(itemPedido);
            }
        }
        @SuppressWarnings("null")
        Pedido savedPedido = pedidoRepository.save(findPedido);
        return PedidoMapper.toUpdate(savedPedido);
    }

}
