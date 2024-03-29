package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Usuario;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.repositories.UsuarioRepository;
import com.leonardo.spring_sistema_de_pedidos.dto.PedidoCompletoRequestDTO;
import com.leonardo.spring_sistema_de_pedidos.services.PedidoService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class PedidoController {

    public final PedidoService pedidoService;
    public final PedidoRepository pedidoRepository;
    public final UsuarioRepository usuarioRepository;

    public PedidoController(PedidoService pedidoService, UsuarioRepository usuarioRepository,
            PedidoRepository pedidoRepository) {
        this.pedidoService = pedidoService;
        this.usuarioRepository = usuarioRepository;
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/buscar-pedidos")
    public ResponseEntity<List<PedidoResponseDTO>> findAll(
            @RequestParam(name = "consultorId", required = false) Long consultorId,
            @RequestParam(name = "page", required = false) Integer page,
            @RequestParam(name = "size", required = false) Integer size,
            @RequestParam(name = "cnpj", required = false) String cnpj) {

        if (cnpj != null) {
            return ResponseEntity.ok(pedidoService.findByCnpj(cnpj));
        }

        if (consultorId != null) {
            Usuario usuario = usuarioRepository.findById(consultorId)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

            if (usuario.getNivel() < 5 && page != null && size != null) {
                Pageable pageable = PageRequest.of(page, size);
                return ResponseEntity.ok(pedidoService.findByConsultor(consultorId, pageable));
            }

            if (usuario.getNivel() >= 5 && page != null && size != null) {
                Pageable pageable = PageRequest.of(page, size);
                return ResponseEntity.ok(pedidoService.findAll(pageable));
            }
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/inserir-pedido/{usuarioId}")
    public ResponseEntity<PedidoCompletoRequestDTO> save(@RequestBody PedidoCompletoRequestDTO pedidoCompleto,
            @PathVariable @NonNull Long usuarioId) {
        PedidoCompletoRequestDTO savedPedido = pedidoService.save(pedidoCompleto, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPedido);
    }

    @PatchMapping("/editar-pedido/{usuarioId}/{id}/{itemId}")
    public ResponseEntity<PedidoCompletoRequestDTO> update(@RequestBody PedidoCompletoRequestDTO pedido,
            @PathVariable @NonNull Long usuarioId, @PathVariable @NonNull Long id, @PathVariable @NonNull Long itemId) {
        PedidoCompletoRequestDTO updatePedido = pedidoService.update(pedido, usuarioId, id, itemId);
        return ResponseEntity.ok(updatePedido);
    }
}
