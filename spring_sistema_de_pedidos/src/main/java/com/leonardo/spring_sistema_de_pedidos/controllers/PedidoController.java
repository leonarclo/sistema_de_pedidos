package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.dto.PedidoResponseDTO;
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

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping("/buscar-pedidos")
    public ResponseEntity<List<PedidoResponseDTO>> findAll(
            @RequestParam(name = "consultor", required = false) String consultor,
            @RequestParam(name = "usuarioId", required = false) Long usuario) {
        return ResponseEntity
                .ok(consultor == null ? pedidoService.findAll()
                        : pedidoService.findByConsultor(consultor, usuario));
    }

    @PostMapping("/inserir-pedido/{usuarioId}")
    public ResponseEntity<PedidoCompletoRequestDTO> save(@RequestBody PedidoCompletoRequestDTO pedidoCompleto,
            @PathVariable @NonNull Long usuarioId) {
        PedidoCompletoRequestDTO savedPedido = pedidoService.save(pedidoCompleto, usuarioId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPedido);
    }

    @PostMapping("/editar-pedido/{usuarioId}/{id}/{itemId}")
    public ResponseEntity<PedidoCompletoRequestDTO> update(@RequestBody PedidoCompletoRequestDTO pedido,
            @PathVariable @NonNull Long usuarioId, @PathVariable @NonNull Long id, @PathVariable @NonNull Long itemId) {
        PedidoCompletoRequestDTO updatePedido = pedidoService.update(pedido, usuarioId, id, itemId);
        return ResponseEntity.ok(updatePedido);
    }

}
