package com.leonardo.spring_sistema_de_pedidos.services;

import java.time.LocalDateTime;
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
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.ArquivoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.ItemPedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;

import jakarta.transaction.Transactional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final ItemPedidoRepository itemPedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ArquivoRepository arquivoRepository;

    private static final ModelMapper modelMapper = new ModelMapper();

    public PedidoService(PedidoRepository pedidoRepository, ItemPedidoRepository itemPedidoRepository,
            UsuarioRepository usuarioRepository, ArquivoRepository arquivoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.itemPedidoRepository = itemPedidoRepository;
        this.usuarioRepository = usuarioRepository;
        this.arquivoRepository = arquivoRepository;
    }

    public List<PedidoResponseDTO> findAll() {
        return PedidoMapper.toPedidoList(pedidoRepository.findAllByOrderByIdDesc());
    }

    public List<PedidoResponseDTO> findByCnpj(String cnpj) {
        return PedidoMapper.toPedidoList(pedidoRepository.findFirstByCnpj(cnpj));
    }

    public List<PedidoResponseDTO> findByConsultor(Usuario criadoPor) {
        return PedidoMapper
                .toPedidoList(pedidoRepository.findByCriadoPorOrderByIdDesc(criadoPor));
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

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        modelMapper.map(pedidoCompleto, pedido);
        pedido.setCriadoPor(usuario);

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

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        updatePedido.setEditadoPor(usuario);
        updatePedido.setEditadoEm(LocalDateTime.now());
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
