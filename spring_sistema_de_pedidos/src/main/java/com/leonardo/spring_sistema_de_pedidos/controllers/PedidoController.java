package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            @RequestParam(name = "consultor", required = false) String consultor) {
        return ResponseEntity
                .ok(consultor == null ? pedidoService.findAll() : pedidoService.findByConsultor(consultor));
    }

    @GetMapping("/buscar-meus-pedidos")
    public ResponseEntity<List<PedidoResponseDTO>> findByConsultor(@RequestParam(name = "consultor") String consultor) {
        List<PedidoResponseDTO> meusPedidos = pedidoService.findByConsultor(consultor);
        return ResponseEntity.ok(meusPedidos);
    }

    @PostMapping("/inserir-pedido")
    public ResponseEntity<PedidoCompletoRequestDTO> save(@RequestBody PedidoCompletoRequestDTO pedidoCompleto) {
        PedidoCompletoRequestDTO savedPedido = pedidoService.save(pedidoCompleto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPedido);
    }

    @PostMapping("/editar-pedido/{id}/{itemId}")
    public ResponseEntity<PedidoCompletoRequestDTO> update(@PathVariable Long id, @PathVariable Long itemId,
            @RequestBody PedidoCompletoRequestDTO pedido) {
        PedidoCompletoRequestDTO updatePedido = pedidoService.update(pedido, id, itemId);
        return ResponseEntity.ok(updatePedido);
    }

}
